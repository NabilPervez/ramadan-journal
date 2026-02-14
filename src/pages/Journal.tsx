import { Box, VStack, Heading, Text, Textarea, HStack, Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateJournal } from '../features/dailyLog/dailyLogSlice'
import { useState } from 'react'
import { FaMoon, FaSun, FaSmile } from 'react-icons/fa'

const Journal = () => {
    const dispatch = useDispatch()
    const journal = useSelector((state: RootState) => state.dailyLog.journal)
    const [activeTab, setActiveTab] = useState("morning")

    const handleMood = (mood: string) => {
        dispatch(updateJournal({ mood }))
    }

    return (
        <Box p={4} pb={24}>
            <Heading size="xl" mb={6} color="#0F4C5C" fontFamily="'Playfair Display', serif">
                Journal
            </Heading>

            {/* Custom Tab Switcher */}
            <HStack bg="gray.200" p={1} rounded="full" mb={8}>
                <Button
                    flex={1}
                    rounded="full"
                    bg={activeTab === 'morning' ? "white" : "transparent"}
                    shadow={activeTab === 'morning' ? "sm" : "none"}
                    color={activeTab === 'morning' ? "#0F4C5C" : "gray.500"}
                    onClick={() => setActiveTab('morning')}
                >
                    <FaSun style={{ marginRight: '8px' }} /> Morning
                </Button>
                <Button
                    flex={1}
                    rounded="full"
                    bg={activeTab === 'evening' ? "white" : "transparent"}
                    shadow={activeTab === 'evening' ? "sm" : "none"}
                    color={activeTab === 'evening' ? "#0F4C5C" : "gray.500"}
                    onClick={() => setActiveTab('evening')}
                >
                    <FaMoon style={{ marginRight: '8px' }} /> Evening
                </Button>
            </HStack>

            {activeTab === 'morning' ? (
                <VStack gap={6} align="start">
                    <Box w="full" bg="white" p={6} rounded="2xl" shadow="sm">
                        <Text fontWeight="bold" mb={4} color="#0F4C5C">Daily Intention</Text>
                        <Textarea
                            placeholder="Today I will focus on..."
                            value={journal.intention}
                            onChange={(e) => dispatch(updateJournal({ intention: e.target.value }))}
                            minH="120px"
                            bg="gray.50"
                            border="none"
                            _focus={{ ring: 1, ringColor: "#D4AF37" }}
                        />
                    </Box>
                    <Box w="full" bg="white" p={6} rounded="2xl" shadow="sm">
                        <Text fontWeight="bold" mb={4} color="#0F4C5C">Sleep (Hours)</Text>
                        <Textarea
                            placeholder="How many hours?"
                        />
                    </Box>
                </VStack>
            ) : (
                <VStack gap={6} align="start">
                    <Box w="full" bg="white" p={6} rounded="2xl" shadow="sm">
                        <Text fontWeight="bold" mb={4} color="#0F4C5C">How do you feel?</Text>
                        <HStack justify="space-between">
                            {['Happy', 'Grateful', 'Neutral', 'Sad', 'Anxious'].map((m) => (
                                <VStack key={m} gap={1} onClick={() => handleMood(m)} cursor="pointer" opacity={journal.mood === m ? 1 : 0.4}>
                                    <Box p={3} bg={journal.mood === m ? "#D4AF37" : "gray.100"} rounded="full" color={journal.mood === m ? "white" : "gray.500"}>
                                        <FaSmile />
                                    </Box>
                                    <Text fontSize="xs">{m}</Text>
                                </VStack>
                            ))}
                        </HStack>
                    </Box>

                    <Box w="full" bg="white" p={6} rounded="2xl" shadow="sm">
                        <Text fontWeight="bold" mb={4} color="#0F4C5C">Reflection</Text>
                        <Textarea
                            placeholder="What did you learn today?"
                            value={journal.reflection}
                            onChange={(e) => dispatch(updateJournal({ reflection: e.target.value }))}
                            minH="150px"
                            bg="gray.50"
                        />
                    </Box>
                </VStack>
            )}
        </Box>
    )
}

export default Journal
