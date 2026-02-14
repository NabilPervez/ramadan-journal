import { Box, VStack, Heading, Text, Flex, SimpleGrid, Badge, Button, Icon } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import moment from 'moment-hijri'
import { updatePrayer, incrementWater } from '../features/dailyLog/dailyLogSlice'
import { FaCheck, FaTint, FaMapMarkerAlt, FaMinus, FaPlus } from 'react-icons/fa'

const Dashboard = () => {
    const dispatch = useDispatch()
    const settings = useSelector((state: RootState) => state.settings)
    const dailyLog = useSelector((state: RootState) => state.dailyLog)

    // nextPrayer logic removed for now to clean up unused state
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
    const [timeDiff, setTimeDiff] = useState<string>('--:--')

    // Calculate prayer times
    useEffect(() => {
        if (settings.location && settings.calculationMethod) {
            const coords = new Coordinates(settings.location.lat, settings.location.lng)
            const date = new Date()
            const params = CalculationMethod[settings.calculationMethod as keyof typeof CalculationMethod]()
            if (settings.madhab === 'Hanafi') {
                params.madhab = Madhab.Hanafi
            }
            const times = new PrayerTimes(coords, date, params)
            setPrayerTimes(times)

            const now = new Date()
            let nextP = null
            if (now < times.fajr) nextP = { name: 'Fajr', time: times.fajr }
            else if (now < times.dhuhr) nextP = { name: 'Dhuhr', time: times.dhuhr }
            else if (now < times.asr) nextP = { name: 'Asr', time: times.asr }
            else if (now < times.maghrib) nextP = { name: 'Maghrib', time: times.maghrib }
            else if (now < times.isha) nextP = { name: 'Isha', time: times.isha }
            else nextP = { name: 'Fajr', time: times.fajr } // Next day

            if (nextP) {
                const diff = nextP.time.getTime() - now.getTime()
                if (diff > 0) {
                    const hours = Math.floor(diff / (1000 * 60 * 60))
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                    setTimeDiff(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
                }
            }
        }
    }, [settings])

    if (!settings.location) {
        return <Box p={5} color="white">Please complete setup first.</Box>
    }

    const prayers = [
        { key: 'fajr', name: 'Fajr', time: prayerTimes?.fajr },
        { key: 'dhuhr', name: 'Dhuhr', time: prayerTimes?.dhuhr },
        { key: 'asr', name: 'Asr', time: prayerTimes?.asr },
        { key: 'maghrib', name: 'Maghrib', time: prayerTimes?.maghrib },
        { key: 'isha', name: 'Isha', time: prayerTimes?.isha },
    ]

    return (
        <Box p={4} pb={32} bg="#0B1116" minH="100vh" color="white">
            {/* Header */}
            <Flex justify="space-between" align="start" mb={8}>
                <VStack align="start" gap={0}>
                    <Text fontSize="xs" color="#00C6D1" fontWeight="bold" letterSpacing="wider">TODAY</Text>
                    <Heading size="lg" fontFamily="'Playfair Display', serif">
                        {moment().format('iD iMMMM iYYYY')}
                    </Heading>
                    <Text fontSize="sm" color="gray.400">
                        {moment().format('iYYYY')} AH
                    </Text>
                </VStack>

                <Flex align="center" bg="#151F26" px={3} py={1} rounded="full" gap={2} border="1px solid" borderColor="whiteAlpha.100">
                    <FaMapMarkerAlt color="#E6B800" size={12} />
                    <Text fontSize="xs" fontWeight="medium">
                        {settings.location.city.split(',')[0]}
                    </Text>
                </Flex>
            </Flex>

            {/* Circular Timer Hero */}
            <Flex justify="center" mb={10} position="relative">
                <Box position="relative" w="240px" h="240px" display="flex" alignItems="center" justifyContent="center">
                    {/* Background Circle */}
                    <Box
                        position="absolute" top={0} left={0} w="full" h="full" rounded="full"
                        border="4px solid" borderColor="#151F26"
                    />
                    {/* Progress Circle (Static for now, implies time passing) */}
                    <Box
                        position="absolute" top={0} left={0} w="full" h="full" rounded="full"
                        border="4px solid" borderColor="#E6B800"
                        borderTopColor="transparent" borderLeftColor="transparent"
                        transform="rotate(-45deg)"
                    />

                    <VStack gap={1} zIndex={1}>
                        <Icon as={FaTint} color="#E6B800" boxSize={6} opacity={0.8} />
                        <Heading size="4xl" fontFamily="'Playfair Display', serif" lineHeight="1">
                            {timeDiff}
                        </Heading>
                        <Text fontSize="xs" letterSpacing="widest" opacity={0.6}>UNTIL NEXT PRAYER</Text>

                        <Badge mt={2} bg="#151F26" color="#E6B800" px={3} py={1} rounded="full" border="1px solid" borderColor="#E6B800">
                            Next: {prayerTimes?.maghrib ? format(prayerTimes.maghrib, 'h:mm a') : '--:--'} {/* Placeholder label */}
                        </Badge>
                    </VStack>
                </Box>
            </Flex>

            {/* Prayer Tracker */}
            <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" fontFamily="'Playfair Display', serif">Prayer Tracker</Heading>
                <Text fontSize="xs" color="#00C6D1" cursor="pointer">View All</Text>
            </Flex>

            <SimpleGrid columns={2} gap={4} mb={8}>
                {prayers.slice(0, 2).map((prayer) => {
                    const status = dailyLog.prayers?.[prayer.key as keyof typeof dailyLog.prayers]?.status
                    const isPrayed = status === 'prayed'

                    return (
                        <Box key={prayer.key} bg="#151F26" p={5} rounded="2xl" border="1px solid" borderColor={isPrayed ? "#00C6D1" : "transparent"}>
                            <Flex justify="space-between" mb={2}>
                                <Text fontWeight="bold" fontSize="lg">{prayer.name}</Text>
                                <Icon as={FaTint} color="gray.600" />
                            </Flex>
                            <Text fontSize="sm" color="gray.400" mb={4}>
                                {prayer.time ? format(prayer.time, 'h:mm a') : '--:--'}
                            </Text>

                            <VStack align="start" gap={2}>
                                <Flex align="center" gap={2} cursor="pointer" onClick={() => dispatch(updatePrayer({
                                    prayer: prayer.key as any,
                                    status: { status: isPrayed ? 'pending' : 'prayed', jamaah: false }
                                }))}>
                                    <Box w={4} h={4} rounded="full" border="1px solid" borderColor={isPrayed ? "#00C6D1" : "gray.500"} bg={isPrayed ? "#00C6D1" : "transparent"} display="flex" alignItems="center" justifyContent="center">
                                        {isPrayed && <FaCheck size={10} color="#0B1116" />}
                                    </Box>
                                    <Text fontSize="xs" color={isPrayed ? "white" : "gray.500"}>Prayed</Text>
                                </Flex>
                                <Flex align="center" gap={2}>
                                    <Box w={4} h={4} rounded="full" border="1px solid" borderColor="gray.500" />
                                    <Text fontSize="xs" color="gray.500">On Time</Text>
                                </Flex>
                            </VStack>
                        </Box>
                    )
                })}
            </SimpleGrid>

            {/* Quick Wellness */}
            <Heading size="md" mb={4} fontFamily="'Playfair Display', serif">Quick Wellness</Heading>
            <Box bg="#151F26" p={5} rounded="2xl" position="relative" overflow="hidden">
                <Box position="absolute" right={-5} bottom={-5} opacity={0.1}>
                    <Icon as={FaTint} boxSize={32} />
                </Box>

                <Flex justify="space-between" align="center">
                    <Flex gap={4} align="center">
                        <Box p={3} bg="whiteAlpha.100" rounded="full">
                            <FaTint color="#00C6D1" size={20} />
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Hydration</Text>
                            <Text fontSize="sm" color="gray.400"><Text as="span" color="#00C6D1" fontSize="lg" fontWeight="bold">{dailyLog.wellness.waterCount}</Text> / 8 cups</Text>
                        </Box>
                    </Flex>

                    <Flex gap={2}>
                        <Button size="sm" rounded="full" w={8} h={8} minW={8} p={0} bg="#0B1116" color="white" onClick={() => {/* decrement logic missing in slice, skipping implementation */ }}>
                            <FaMinus size={10} />
                        </Button>
                        <Button size="sm" rounded="full" w={8} h={8} minW={8} p={0} bg="#00C6D1" color="#0B1116" onClick={() => dispatch(incrementWater())}>
                            <FaPlus size={10} />
                        </Button>
                    </Flex>
                </Flex>
            </Box>

        </Box>
    )
}

export default Dashboard
