import { Box, VStack, Heading, Text, Textarea, Flex, Button, SimpleGrid, Container, Switch, Slider, Icon } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateJournal, setSleepHours } from '../features/dailyLog/dailyLogSlice'
import { useState } from 'react'
import { FaMoon, FaSun, FaSmile, FaFire, FaUserFriends, FaMask, FaClock, FaBed } from 'react-icons/fa'

const Journal = () => {
    const dispatch = useDispatch()
    const journal = useSelector((state: RootState) => state.dailyLog.journal)
    const wellness = useSelector((state: RootState) => state.dailyLog.wellness)
    const [mode, setMode] = useState<'suhoor' | 'iftar'>('iftar')

    const handleMood = (mood: string) => {
        dispatch(updateJournal({ mood }))
    }

    const habits = [
        { id: 'anger', label: 'Anger', sub: 'Kept my cool', icon: FaFire, color: 'red.400' },
        { id: 'backbiting', label: 'Backbiting', sub: 'Spoke only good', icon: FaUserFriends, color: 'orange.400' },
        { id: 'lying', label: 'Lying', sub: 'Stayed truthful', icon: FaMask, color: 'purple.400' },
        { id: 'delaying', label: 'Delaying', sub: 'Acted promptly', icon: FaClock, color: 'blue.400' },
    ]

    const toggleHabit = (id: string, isChecked: boolean) => {
        const currentHabits = journal.habitsAvoided || []
        let newHabits
        if (isChecked) {
            newHabits = [...currentHabits, id]
        } else {
            newHabits = currentHabits.filter(h => h !== id)
        }
        dispatch(updateJournal({ habitsAvoided: newHabits }))
    }

    return (
        <Box bg="#0B1116" minH="100vh" color="white" pb={32}>
            <Container maxW="container.md" px={4} py={4}>
                <Flex justify="space-between" align="center" mb={1}>
                    <Text fontSize="xs" color="#00C6D1" fontWeight="bold">RAMADAN REFLECTIONS</Text>
                    <Box as="span" color="gray.500"><FaClock /></Box> {/* History icon placeholder */}
                </Flex>
                <Heading size="xl" mb={6} fontFamily="'Playfair Display', serif">
                    Daily Journal
                </Heading>

                {/* Toggle Switch */}
                <Flex bg="#151F26" p={1} rounded="full" mb={8}>
                    <Button
                        flex={1}
                        rounded="full"
                        bg={mode === 'suhoor' ? "#1E2A35" : "transparent"}
                        color={mode === 'suhoor' ? "white" : "gray.500"}
                        size="sm"
                        fontWeight="normal"
                        onClick={() => setMode('suhoor')}
                    >
                        <FaSun style={{ marginRight: '8px' }} /> Suhoor
                    </Button>
                    <Button
                        flex={1}
                        rounded="full"
                        bg={mode === 'iftar' ? "#00C6D1" : "transparent"}
                        color={mode === 'iftar' ? "#0B1116" : "gray.500"}
                        size="sm"
                        fontWeight="bold"
                        onClick={() => setMode('iftar')}
                    >
                        <FaMoon style={{ marginRight: '8px' }} /> Iftar
                    </Button>
                </Flex>

                {mode === 'suhoor' ? (
                    <VStack gap={6} align="start">
                        {/* Intention */}
                        <Box w="full" bg="#151F26" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.50">
                            <Text fontWeight="bold" mb={4} fontSize="lg">Daily Intention</Text>
                            <Textarea
                                placeholder="Today I will focus on..."
                                value={journal.intention}
                                onChange={(e) => dispatch(updateJournal({ intention: e.target.value }))}
                                minH="120px"
                                bg="#0B1116"
                                border="none"
                                color="white"
                                _placeholder={{ color: 'gray.600' }}
                            />
                        </Box>

                        {/* Sleep Log */}
                        <Box w="full" bg="#151F26" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.50">
                            <Flex justify="space-between" mb={4}>
                                <Flex align="center" gap={2}>
                                    <Icon as={FaBed} color="#00C6D1" />
                                    <Text fontWeight="bold" fontSize="lg">Sleep Log</Text>
                                </Flex>
                                <Text color="#00C6D1" fontWeight="bold">{wellness.sleepHours} hrs</Text>
                            </Flex>
                            <Text fontSize="xs" color="gray.400" mb={6}>How many hours did you sleep?</Text>

                            <Box px={2}>
                                <Slider.Root
                                    min={0} max={12} step={0.5}
                                    value={[wellness.sleepHours || 6]}
                                    onValueChange={(val) => dispatch(setSleepHours(val.value[0]))}
                                    colorPalette="cyan"
                                >
                                    <Slider.Label />
                                    <Slider.Track bg="gray.700">
                                        <Slider.Range />
                                    </Slider.Track>
                                    <Slider.Thumb index={0} />
                                </Slider.Root>
                            </Box>
                        </Box>
                    </VStack>
                ) : (
                    <VStack gap={8} align="start">
                        {/* Mood */}
                        <Box w="full">
                            <Flex justify="center" align="center" gap={2} mb={4} position="relative">
                                <Box w="3px" h="16px" bg="#00C6D1" rounded="full" />
                                <Text fontWeight="bold" fontSize="lg">How was your Iftar?</Text>
                            </Flex>

                            <Flex justify="space-between" align="start">
                                {['Tough', 'Low', 'Okay', 'Good', 'Blessed'].map((m) => (
                                    <VStack key={m} gap={2} onClick={() => handleMood(m)} cursor="pointer">
                                        <Flex
                                            w={12} h={12}
                                            rounded="full"
                                            bg={journal.mood === m ? "transparent" : "#151F26"}
                                            border="2px solid"
                                            borderColor={journal.mood === m ? "#00C6D1" : "transparent"}
                                            align="center" justify="center"
                                            color={journal.mood === m ? "#00C6D1" : "gray.500"}
                                            shadow={journal.mood === m ? "0 0 15px rgba(0, 198, 209, 0.3)" : "none"}
                                        >
                                            <FaSmile size={24} />
                                        </Flex>
                                        <Text fontSize="xs" color={journal.mood === m ? "#00C6D1" : "gray.600"} fontWeight="bold" textTransform="uppercase">{m}</Text>
                                    </VStack>
                                ))}
                            </Flex>
                        </Box>

                        {/* Reflection */}
                        <Box w="full" bg="#151F26" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.50">
                            <Flex justify="space-between" mb={4}>
                                <Flex align="center" gap={2}>
                                    <Box w="3px" h="16px" bg="#00C6D1" rounded="full" />
                                    <Text fontWeight="bold" fontSize="lg">Evening Reflection</Text>
                                </Flex>
                                <Text fontSize="xs" color="#00C6D1">New Prompt</Text>
                            </Flex>

                            <Text color="gray.300" mb={4} fontStyle="italic">
                                "In what moment did you feel most connected to your faith today?"
                            </Text>

                            <Textarea
                                placeholder="Tap here to reflect..."
                                value={journal.reflection}
                                onChange={(e) => dispatch(updateJournal({ reflection: e.target.value }))}
                                minH="120px"
                                bg="#0B1116"
                                border="none"
                                color="white"
                                rounded="xl"
                                _placeholder={{ color: 'gray.600' }}
                            />
                        </Box>

                        {/* Habit Breaker */}
                        <Box w="full">
                            <Flex align="center" gap={2} mb={4}>
                                <Box w="3px" h="16px" bg="#00C6D1" rounded="full" />
                                <Text fontWeight="bold" fontSize="lg">Habit Breaker</Text>
                                <Text ml="auto" fontSize="xs" color="gray.500">Today's Avoidance</Text>
                            </Flex>

                            <SimpleGrid columns={2} gap={4}>
                                {habits.map((habit) => {
                                    const isAvoided = journal.habitsAvoided?.includes(habit.id)
                                    return (
                                        <Box key={habit.id} bg="#151F26" p={4} rounded="2xl" border="1px solid" borderColor={isAvoided ? habit.color : "transparent"}>
                                            <Flex justify="space-between" mb={4}>
                                                <Box p={2} bg={isAvoided ? habit.color : `${habit.color.split('.')[0]}.900`} rounded="full" color={isAvoided ? "white" : habit.color}>
                                                    <habit.icon />
                                                </Box>
                                                <Switch.Root
                                                    colorPalette="cyan"
                                                    checked={isAvoided}
                                                    onCheckedChange={(e) => toggleHabit(habit.id, e.checked)}
                                                >
                                                    <Switch.HiddenInput />
                                                    <Switch.Control>
                                                        <Switch.Thumb />
                                                    </Switch.Control>
                                                </Switch.Root>
                                            </Flex>
                                            <Text fontWeight="bold" color={isAvoided ? "white" : "gray.200"}>{habit.label}</Text>
                                            <Text fontSize="xs" color="gray.500">{habit.sub}</Text>
                                        </Box>
                                    )
                                })}
                            </SimpleGrid>
                        </Box>

                        <Button
                            w="full"
                            size="lg"
                            bg="#00C6D1"
                            color="#0B1116"
                            rounded="full"
                            mt={4}
                            _hover={{ bg: "#00A8B3" }}
                            onClick={() => alert("Saved!")} // Simple feedback for now
                        >
                            Save Reflection
                        </Button>
                    </VStack>
                )}
            </Container>
        </Box>
    )
}

export default Journal
