import { Box, VStack, Heading, Text, Input, Stack, NativeSelect, Button } from '@chakra-ui/react'
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
                    alert("Could not get location. Please ensure permission is granted.")
                }
            )
        } else {
            alert("Geolocation is not supported by this browser.")
            setIsLoadingLocation(false)
        }
    }

    const handleComplete = () => {
        if (!settings.location) {
            alert("Please set your location.")
            return
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
                maxW="md"
                textAlign="center"
            >
                <Heading fontFamily="'Playfair Display', serif" color="#0F4C5C">
                    Welcome to Ramadan Reflections
                </Heading>
                <Text color="gray.600">
                    Let's personalize your experience. We need your location to calculate accurate prayer times.
                </Text>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">1. Location</Text>
                    {settings.location ? (
                        <Box p={4} bg="green.50" color="green.700" rounded="md" w="full">
                            Location Set: {settings.location.lat.toFixed(2)}, {settings.location.lng.toFixed(2)}
                        </Box>
                    ) : (
                        <Button
                            onClick={handleLocation}
                            loading={isLoadingLocation}
                            w="full"
                            bg="#0F4C5C"
                            color="white"
                        >
                            Detect My Location
                        </Button>
                    )}
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">2. Calculation Method</Text>
                    <NativeSelect.Root>
                        <NativeSelect.Field
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            {calculationMethods.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </NativeSelect.Field>
                    </NativeSelect.Root>
                </VStack>

                <VStack w="full" gap={4} align="start">
                    <Text fontWeight="bold" color="#0F4C5C">3. Madhab (Asr Time)</Text>
                    <Stack direction="row" gap={4}>
                        <Button
                            variant={madhab === 'Standard' ? "solid" : "outline"}
                            colorScheme="teal"
                            onClick={() => setMadhab('Standard')}
                            size="sm"
                        >
                            Standard
                        </Button>
                        <Button
                            variant={madhab === 'Hanafi' ? "solid" : "outline"}
                            colorScheme="teal"
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
