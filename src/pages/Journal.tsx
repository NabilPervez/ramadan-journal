import { Box, VStack, Heading, Text, Textarea, Flex, Button, SimpleGrid } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateJournal } from '../features/dailyLog/dailyLogSlice'
import { useState } from 'react'
import { FaMoon, FaSun, FaSmile, FaFire, FaUserFriends, FaMask, FaClock } from 'react-icons/fa'

const Journal = () => {
    const dispatch = useDispatch()
    const journal = useSelector((state: RootState) => state.dailyLog.journal)
    const [mode, setMode] = useState<'suhoor' | 'iftar'>('iftar') // Default to iftar matching screenshot

    const handleMood = (mood: string) => {
        dispatch(updateJournal({ mood }))
    }

    const habits = [
        { id: 'anger', label: 'Anger', sub: 'Kept my cool', icon: FaFire, color: 'red.400' },
        { id: 'backbiting', label: 'Backbiting', sub: 'Spoke only good', icon: FaUserFriends, color: 'orange.400' },
        { id: 'lying', label: 'Lying', sub: 'Stayed truthful', icon: FaMask, color: 'purple.400' },
        { id: 'delaying', label: 'Delaying', sub: 'Acted promptly', icon: FaClock, color: 'blue.400' },
    ]

    return (
        <Box p={4} pb={32} bg="#0B1116" minH="100vh" color="white">
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
                            {habits.map((habit) => (
                                <Box key={habit.id} bg="#151F26" p={4} rounded="2xl">
                                    <Flex justify="space-between" mb={4}>
                                        <Box p={2} bg={`${habit.color.split('.')[0]}.900`} rounded="full" color={habit.color}>
                                            <habit.icon />
                                        </Box>
                                        <Switch.Root colorPalette="cyan">
                                            <Switch.HiddenInput />
                                            <Switch.Control>
                                                <Switch.Thumb />
                                            </Switch.Control>
                                        </Switch.Root>
                                    </Flex>
                                    <Text fontWeight="bold">{habit.label}</Text>
                                    <Text fontSize="xs" color="gray.500">{habit.sub}</Text>
                                </Box>
                            ))}
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
                    >
                        Save Reflection
                    </Button>
                </VStack>
            )}
        </Box>
    )
}

export default Journal
