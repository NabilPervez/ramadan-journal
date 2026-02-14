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
        <Box minH="100vh" bg="#0B1116" p={8} display="flex" alignItems="center" justifyContent="center">
            <VStack
                bg="#151F26"
                p={8}
                rounded="2xl"
                shadow="xl"
                gap={8}
                w="full"
                textAlign="center"
                maxW={{ base: "full", md: "container.md", lg: "container.lg" }}
                border="1px solid" borderColor="whiteAlpha.100"
            >
                <Heading fontFamily="'Playfair Display', serif" color="white">
                    Welcome to Ramadan Reflections
                </Heading>
                <Text color="gray.400">
                    Let's personalize your experience. We need your location to calculate accurate prayer times.
                </Text>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#00C6D1">1. Location</Text>
                    {settings.location && !manualMode ? (
                        <Box p={4} bg="green.900" color="green.200" rounded="md" w="full" border="1px solid" borderColor="green.700">
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
                                        bg="#00C6D1"
                                        color="#0B1116"
                                        mb={2}
                                    >
                                        Detect My Location
                                    </Button>
                                    <Button size="sm" variant="ghost" color="gray.400" onClick={() => setManualMode(true)}>
                                        Enter Manually
                                    </Button>
                                </Box>
                            ) : (
                                <VStack w="full" gap={2} align="start" p={4} bg="#0B1116" rounded="md" border="1px solid" borderColor="whiteAlpha.100">
                                    <Text fontSize="sm" fontWeight="bold" color="white">Manual Entry</Text>
                                    <Input
                                        placeholder="City Name"
                                        value={manualCity}
                                        onChange={(e) => setManualCity(e.target.value)}
                                        bg="#151F26" color="white" border="none"
                                    />
                                    <Flex gap={2} w="full">
                                        <Input
                                            placeholder="Latitude"
                                            value={manualLat}
                                            onChange={(e) => setManualLat(e.target.value)}
                                            bg="#151F26" color="white" border="none"
                                        />
                                        <Input
                                            placeholder="Longitude"
                                            value={manualLng}
                                            onChange={(e) => setManualLng(e.target.value)}
                                            bg="#151F26" color="white" border="none"
                                        />
                                    </Flex>
                                    <Button size="sm" colorScheme="cyan" onClick={handleManualLocation}>
                                        Save Location
                                    </Button>
                                    <Button size="xs" variant="ghost" color="gray.400" onClick={() => setManualMode(false)}>
                                        Cancel
                                    </Button>
                                </VStack>
                            )}
                        </>
                    )}
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#00C6D1">2. Calculation Method</Text>
                    <NativeSelect.Root>
                        <NativeSelect.Field
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            color="white"
                            bg="#0B1116"
                            borderColor="whiteAlpha.200"
                            _focus={{ borderColor: "#00C6D1" }}
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
                    <Text fontWeight="bold" color="#00C6D1">3. Madhab (Asr Time)</Text>
                    <Stack direction="row" gap={4}>
                        <Button
                            variant={madhab === 'Standard' ? "solid" : "outline"}
                            bg={madhab === 'Standard' ? "#00C6D1" : "transparent"}
                            color={madhab === 'Standard' ? "#0B1116" : "#00C6D1"}
                            borderColor="#00C6D1"
                            _hover={{ bg: madhab === 'Standard' ? "#00A8B3" : "whiteAlpha.100" }}
                            onClick={() => setMadhab('Standard')}
                            size="sm"
                        >
                            Standard
                        </Button>
                        <Button
                            variant={madhab === 'Hanafi' ? "solid" : "outline"}
                            bg={madhab === 'Hanafi' ? "#00C6D1" : "transparent"}
                            color={madhab === 'Hanafi' ? "#0B1116" : "#00C6D1"}
                            borderColor="#00C6D1"
                            _hover={{ bg: madhab === 'Hanafi' ? "#00A8B3" : "whiteAlpha.100" }}
                            onClick={() => setMadhab('Hanafi')}
                            size="sm"
                        >
                            Hanafi
                        </Button>
                    </Stack>
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#00C6D1">4. My Intention</Text>
                    <Input
                        placeholder="My main goal for this Ramadan is..."
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        bg="#0B1116"
                        color="white"
                        border="none"
                    />
                </VStack>

                <Button
                    size="lg"
                    bg="#00C6D1"
                    color="#0B1116"
                    _hover={{ bg: "#00A8B3" }}
                    w="full"
                    mt={4}
                    onClick={handleComplete}
                    fontWeight="bold"
                >
                    Complete Setup
                </Button>
            </VStack>
        </Box>
    )
}

export default Setup
