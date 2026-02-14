import { Box, VStack, Heading, Text, Input, Stack, NativeSelect, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { completeSetup, updateLocation, updateSettings } from '../features/settings/settingsSlice'
import type { RootState } from '../app/store'

const calculationMethods = [
    { label: 'Muslim World League', value: 'MuslimWorldLeague' },
    { label: 'Egyptian', value: 'Egyptian' },
    { label: 'Karachi', value: 'Karachi' },
    { label: 'Umm Al-Qura', value: 'UmmAlQura' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Moonsighting Committee', value: 'MoonsightingCommittee' },
    { label: 'North America (ISNA)', value: 'NorthAmerica' },
    { label: 'Kuwait', value: 'Kuwait' },
    { label: 'Qatar', value: 'Qatar' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Tehran', value: 'Tehran' },
    { label: 'Turkey', value: 'Turkey' },
]

const Setup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const settings = useSelector((state: RootState) => state.settings)

    const [method, setMethod] = useState(settings.calculationMethod)
    const [madhab, setMadhab] = useState(settings.madhab)
    const [intention, setIntention] = useState('')
    const [isLoadingLocation, setIsLoadingLocation] = useState(false)
    const [manualMode, setManualMode] = useState(false)
    const [manualCity, setManualCity] = useState('Dallas')
    const [manualLat, setManualLat] = useState('32.7767')
    const [manualLng, setManualLng] = useState('-96.7970')

    const handleLocation = () => {
        setIsLoadingLocation(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(updateLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        city: 'Detected Location'
                    }))
                    setIsLoadingLocation(false)
                },
                (error) => {
                    console.error(error)
                    setIsLoadingLocation(false)
                    alert("Could not get location. Falling back to default (Dallas). You can edit below.")
                    setManualMode(true)
                }
            )
        } else {
            alert("Geolocation is not supported by this browser. Please enter manually.")
            setIsLoadingLocation(false)
            setManualMode(true)
        }
    }

    const handleManualLocation = () => {
        const lat = parseFloat(manualLat)
        const lng = parseFloat(manualLng)
        if (isNaN(lat) || isNaN(lng)) {
            alert("Please enter valid coordinates.")
            return
        }
        dispatch(updateLocation({
            lat,
            lng,
            city: manualCity
        }))
        setManualMode(false)
    }

    const handleComplete = () => {
        // Ensure location is set. If not, force Dallas fallback if user skipped.
        if (!settings.location) {
            dispatch(updateLocation({
                lat: 32.7767,
                lng: -96.7970,
                city: 'Dallas (Default)'
            }))
        }

        dispatch(updateSettings({
            calculationMethod: method,
            madhab: madhab
        }))
        dispatch(completeSetup())
        navigate('/dashboard')
    }

    return (
        <Box minH="100vh" bg="#F5F1E8" p={8} display="flex" alignItems="center" justifyContent="center">
            <VStack
                bg="white"
                p={8}
                rounded="2xl"
                shadow="xl"
                gap={8}
                w="full"
                textAlign="center"
                // Removed maxW="md" to allow scaling on desktop, but keeping some constraint for readability if needed
                // User asked to scale up to full size. Let's use maxW="container.lg" or just flexible width.
                maxW={{ base: "full", md: "container.md", lg: "container.lg" }}
            >
                <Heading fontFamily="'Playfair Display', serif" color="#0F4C5C">
                    Welcome to Ramadan Reflections
                </Heading>
                <Text color="gray.600">
                    Let's personalize your experience. We need your location to calculate accurate prayer times.
                </Text>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">1. Location</Text>
                    {settings.location && !manualMode ? (
                        <Box p={4} bg="green.50" color="green.700" rounded="md" w="full">
                            Location Set: {settings.location.lat.toFixed(2)}, {settings.location.lng.toFixed(2)}
                            <Button size="xs" variant="ghost" ml={2} onClick={() => setManualMode(true)}>Edit</Button>
                        </Box>
                    ) : (
                        <>
                            {!manualMode ? (
                                <Box w="full">
                                    <Button
                                        onClick={handleLocation}
                                        loading={isLoadingLocation}
                                        w="full"
                                        bg="#0F4C5C"
                                        color="white"
                                        mb={2}
                                    >
                                        Detect My Location
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setManualMode(true)}>
                                        Enter Manually
                                    </Button>
                                </Box>
                            ) : (
                                <VStack w="full" gap={2} align="start" p={4} bg="gray.50" rounded="md">
                                    <Text fontSize="sm" fontWeight="bold">Manual Entry</Text>
                                    <Input
                                        placeholder="City Name"
                                        value={manualCity}
                                        onChange={(e) => setManualCity(e.target.value)}
                                        bg="white" color="black"
                                    />
                                    <Flex gap={2} w="full">
                                        <Input
                                            placeholder="Latitude"
                                            value={manualLat}
                                            onChange={(e) => setManualLat(e.target.value)}
                                            bg="white" color="black"
                                        />
                                        <Input
                                            placeholder="Longitude"
                                            value={manualLng}
                                            onChange={(e) => setManualLng(e.target.value)}
                                            bg="white" color="black"
                                        />
                                    </Flex>
                                    <Button size="sm" colorScheme="teal" onClick={handleManualLocation}>
                                        Save Location
                                    </Button>
                                    <Button size="xs" variant="ghost" onClick={() => setManualMode(false)}>
                                        Cancel
                                    </Button>
                                </VStack>
                            )}
                        </>
                    )}
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">2. Calculation Method</Text>
                    <NativeSelect.Root>
                        <NativeSelect.Field
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            // Fix for white-on-white text
                            color="gray.800"
                            bg="gray.50"
                            borderColor="gray.200"
                            _focus={{ borderColor: "#D4AF37" }}
                        >
                            {calculationMethods.map((m) => (
                                <option key={m.value} value={m.value} style={{ color: 'black' }}>
                                    {m.label}
                                </option>
                            ))}
                        </NativeSelect.Field>
                    </NativeSelect.Root>
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">3. Madhab (Asr Time)</Text>
                    <Stack direction="row" gap={4}>
                        <Button
                            variant={madhab === 'Standard' ? "solid" : "outline"}
                            bg={madhab === 'Standard' ? "#0F4C5C" : "transparent"}
                            color={madhab === 'Standard' ? "white" : "#0F4C5C"}
                            borderColor="#0F4C5C"
                            _hover={{ bg: madhab === 'Standard' ? "#093642" : "gray.100" }}
                            onClick={() => setMadhab('Standard')}
                            size="sm"
                        >
                            Standard
                        </Button>
                        <Button
                            variant={madhab === 'Hanafi' ? "solid" : "outline"}
                            bg={madhab === 'Hanafi' ? "#0F4C5C" : "transparent"}
                            color={madhab === 'Hanafi' ? "white" : "#0F4C5C"}
                            borderColor="#0F4C5C"
                            _hover={{ bg: madhab === 'Hanafi' ? "#093642" : "gray.100" }}
                            onClick={() => setMadhab('Hanafi')}
                            size="sm"
                        >
                            Hanafi
                        </Button>
                    </Stack>
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">4. My Intention</Text>
                    <Input
                        placeholder="My main goal for this Ramadan is..."
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        bg="gray.50"
                        color="gray.800"
                    />
                </VStack>

                <Button
                    size="lg"
                    bg="#D4AF37"
                    color="#F5F1E8"
                    _hover={{ bg: "#C5A028" }}
                    w="full"
                    mt={4}
                    onClick={handleComplete}
                >
                    Complete Setup
                </Button>
            </VStack>
        </Box>
    )
}

export default Setup
