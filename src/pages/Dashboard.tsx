import { Box, VStack, Heading, Text, Flex, SimpleGrid, Badge, Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import moment from 'moment-hijri'
import { updatePrayer, incrementWater } from '../features/dailyLog/dailyLogSlice'
import { FaCheck, FaTint, FaMoon } from 'react-icons/fa'

const Dashboard = () => {
    const dispatch = useDispatch()
    const settings = useSelector((state: RootState) => state.settings)
    const dailyLog = useSelector((state: RootState) => state.dailyLog)

    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
    const [nextPrayer, setNextPrayer] = useState<{ name: string, time: Date } | null>(null)

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

            // Determine next prayer
            const now = new Date()
            if (now < times.fajr) setNextPrayer({ name: 'Fajr', time: times.fajr })
            else if (now < times.dhuhr) setNextPrayer({ name: 'Dhuhr', time: times.dhuhr })
            else if (now < times.asr) setNextPrayer({ name: 'Asr', time: times.asr })
            else if (now < times.maghrib) setNextPrayer({ name: 'Maghrib', time: times.maghrib })
            else if (now < times.isha) setNextPrayer({ name: 'Isha', time: times.isha })
            else setNextPrayer({ name: 'Fajr', time: times.fajr })
        }
    }, [settings])

    if (!settings.location) {
        return <Box p={5}>Please complete setup first.</Box>
    }

    const prayers = [
        { key: 'fajr', name: 'Fajr', time: prayerTimes?.fajr },
        { key: 'dhuhr', name: 'Dhuhr', time: prayerTimes?.dhuhr },
        { key: 'asr', name: 'Asr', time: prayerTimes?.asr },
        { key: 'maghrib', name: 'Maghrib', time: prayerTimes?.maghrib },
        { key: 'isha', name: 'Isha', time: prayerTimes?.isha },
    ]

    return (
        <Box p={4} pb={24}>
            {/* Header */}
            <VStack gap={1} mb={6} align="start">
                <Text fontSize="lg" color="#D4AF37" fontWeight="medium">
                    {moment().format('iD iMMMM iYYYY')} AH
                </Text>
                <Heading size="2xl" fontFamily="'Playfair Display', serif" color="#0F4C5C">
                    {format(new Date(), 'EEEE, MMM do')}
                </Heading>
                <Badge colorScheme="teal" variant="surface">
                    {settings.location.city}
                </Badge>
            </VStack>

            {/* Fasting Timer / Next Prayer Hero */}
            <Box
                bgGradient="linear(to-br, #0F4C5C, #092c35)"
                color="white"
                p={8}
                rounded="3xl"
                shadow="xl"
                mb={8}
                textAlign="center"
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top={-10}
                    right={-10}
                    opacity={0.1}
                    fontSize="150px"
                >
                    <FaMoon />
                </Box>

                <Text fontSize="sm" letterSpacing="wide" textTransform="uppercase" opacity={0.8}>
                    Upcoming Prayer
                </Text>
                <Heading size="4xl" mt={2} mb={2} fontFamily="'Playfair Display', serif">
                    {nextPrayer ? format(nextPrayer.time, 'h:mm a') : '--:--'}
                </Heading>
                <Text fontSize="xl" fontWeight="medium" color="#D4AF37">
                    {nextPrayer?.name}
                </Text>
            </Box>

            {/* Prayer Tracker */}
            <Heading size="lg" mb={4} color="#0F4C5C" fontFamily="'Playfair Display', serif">
                Prayer Tracker
            </Heading>
            <VStack gap={3} mb={8}>
                {prayers.map((prayer) => {
                    const status = dailyLog.prayers?.[prayer.key as keyof typeof dailyLog.prayers]?.status
                    const isPrayed = status === 'prayed'

                    return (
                        <Flex
                            key={prayer.key}
                            w="full"
                            bg="white"
                            p={4}
                            rounded="xl"
                            shadow="sm"
                            align="center"
                            justify="space-between"
                            borderLeft="4px solid"
                            borderColor={isPrayed ? "#8AA399" : "transparent"}
                            transition="all 0.2s"
                        >
                            <Box>
                                <Text fontWeight="bold" color="#2C3E50">{prayer.name}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {prayer.time ? format(prayer.time, 'h:mm a') : '--:--'}
                                </Text>
                            </Box>
                            <Button
                                size="sm"
                                variant={isPrayed ? "solid" : "outline"}
                                colorScheme={isPrayed ? "green" : "gray"}
                                bg={isPrayed ? "#8AA399" : "transparent"}
                                color={isPrayed ? "white" : "gray.600"}
                                onClick={() => dispatch(updatePrayer({
                                    prayer: prayer.key as any,
                                    status: { status: isPrayed ? 'pending' : 'prayed', jamaah: false }
                                }))}
                            >
                                {isPrayed ? <FaCheck /> : "Log"}
                            </Button>
                        </Flex>
                    )
                })}
            </VStack>

            {/* Wellness Section */}
            <Heading size="lg" mb={4} color="#0F4C5C" fontFamily="'Playfair Display', serif">
                Quick Wellness
            </Heading>
            <SimpleGrid columns={2} gap={4}>
                <Box bg="white" p={5} rounded="2xl" shadow="sm">
                    <Flex align="center" gap={2} mb={2}>
                        <FaTint color="#3182CE" />
                        <Text fontWeight="bold" color="#2C3E50">Hydration</Text>
                    </Flex>
                    <Text fontSize="3xl" fontWeight="bold" color="#0F4C5C" mb={2}>
                        {dailyLog.wellness.waterCount} cups
                    </Text>
                    <Button
                        size="sm"
                        w="full"
                        colorScheme="blue"
                        variant="subtle"
                        onClick={() => dispatch(incrementWater())}
                    >
                        + Add Cup
                    </Button>
                </Box>

                <Box bg="white" p={5} rounded="2xl" shadow="sm">
                    <Text fontWeight="bold" color="#2C3E50" mb={2}>Sunnah</Text>
                    <Text fontSize="sm" color="gray.600" mb={3}>
                        Did you do the daily sunnah?
                    </Text>
                    <Button
                        size="sm"
                        w="full"
                        variant={dailyLog.sunnahDidDo ? "solid" : "outline"}
                        colorScheme="yellow"
                        bg={dailyLog.sunnahDidDo ? "#D4AF37" : "transparent"}
                        onClick={() => {
                            // Placeholder
                        }}
                    >
                        {dailyLog.sunnahDidDo ? "Completed" : "Mark Done"}
                    </Button>
                </Box>
            </SimpleGrid>
        </Box>
    )
}

export default Dashboard
