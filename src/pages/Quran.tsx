import { Box, VStack, Heading, Text, Flex, Input, Button, Badge, Container } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateQuranProgress } from '../features/content/contentSlice'
import { FaCheck, FaBookmark, FaChevronDown } from 'react-icons/fa'

const Quran = () => {
    const dispatch = useDispatch()
    const progress = useSelector((state: RootState) => state.content.quranProgress)

    // Simple math for progress (assuming 30 Juz)
    const percentage = ((progress.currentJuz || 0) / 30) * 100

    return (
        <Box bg="#0B1116" minH="100vh" color="white" pb={32}>
            <Container maxW="container.md" px={4} py={4}>
                <Flex justify="space-between" align="center" mb={8}>
                    {/* Back button or filler */}
                    <Box w={8} />
                    <Heading size="md" fontFamily="'Playfair Display', serif">My Quran Journey</Heading>
                    <Box w={8} />
                </Flex>

                {/* Circular Progress Hero */}
                <Flex justify="center" mb={10} position="relative">
                    <Box position="relative" w="220px" h="220px" display="flex" alignItems="center" justifyContent="center">
                        {/* Background Circle */}
                        <Box
                            position="absolute" top={0} left={0} w="full" h="full" rounded="full"
                            border="12px solid" borderColor="#151F26"
                        />
                        {/* Progress Circle Visual */}
                        <Box
                            position="absolute" top={0} left={0} w="full" h="full" rounded="full"
                            border="12px solid" borderColor="#00C6D1"
                            borderLeftColor="transparent" borderBottomColor="transparent"
                            transform={`rotate(${45 + (percentage * 3.6)}deg)`} // Simple rotation logic visualization
                            transition="transform 1s ease-out"
                        />

                        <VStack gap={0} zIndex={1}>
                            <Heading size="3xl" fontFamily="'Playfair Display', serif">
                                {Math.round(percentage)}%
                            </Heading>
                            <Text fontSize="xs" letterSpacing="widest" opacity={0.6} textTransform="uppercase">Completed</Text>
                        </VStack>
                    </Box>
                </Flex>

                <Flex justify="center" gap={12} mb={10}>
                    <VStack gap={0}>
                        <Text fontSize="2xl" fontWeight="bold" color="#00C6D1">{progress.currentJuz || 0}</Text>
                        <Text fontSize="xs" color="gray.500" letterSpacing="widest">JUZ</Text>
                    </VStack>
                    <Box w="1px" h="40px" bg="whiteAlpha.200" />
                    <VStack gap={0}>
                        <Text fontSize="2xl" fontWeight="bold" color="#00C6D1">--</Text>
                        <Text fontSize="xs" color="gray.500" letterSpacing="widest">PAGES</Text>
                    </VStack>
                </Flex>

                {/* Log Reading Card */}
                <Box bg="#151F26" p={6} rounded="3xl" mb={8} border="1px solid" borderColor="whiteAlpha.100">
                    <Flex align="center" gap={2} mb={6}>
                        <Box w="3px" h="16px" bg="#00C6D1" rounded="full" />
                        <Heading size="md">Log Reading</Heading>
                        <Badge ml="auto" bg="#1E2A35" color="#00C6D1" px={3} py={1} rounded="full">Today</Badge>
                    </Flex>

                    <VStack gap={4} align="stretch">
                        <Box>
                            <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Surah</Text>
                            <Box position="relative">
                                {/* Native select for now as Chakra select is complex to setup quickly with icons */}
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        backgroundColor: '#0B1116',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        appearance: 'none'
                                    }}
                                    value={progress.lastSurah || 1}
                                    onChange={(e) => dispatch(updateQuranProgress({ lastSurah: parseInt(e.target.value) }))}
                                >
                                    {Array.from({ length: 114 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}. Surah Name Placeholder</option>
                                    ))}
                                </select>
                                <Box position="absolute" right={4} top={4} pointerEvents="none">
                                    <FaChevronDown color="gray" size={12} />
                                </Box>
                            </Box>
                        </Box>

                        <Flex gap={4}>
                            <Box flex={1}>
                                <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Current Juz</Text>
                                <Flex bg="#0B1116" p={2} rounded="xl" align="center" justify="space-between" border="1px solid" borderColor="whiteAlpha.100">
                                    <Button size="sm" variant="ghost" color="#00C6D1" onClick={() => dispatch(updateQuranProgress({ currentJuz: Math.max(0, (progress.currentJuz || 0) - 1) }))}>-</Button>
                                    <Text fontWeight="bold">{progress.currentJuz || 0}</Text>
                                    <Button size="sm" variant="ghost" color="#00C6D1" onClick={() => dispatch(updateQuranProgress({ currentJuz: Math.min(30, (progress.currentJuz || 0) + 1) }))}>+</Button>
                                </Flex>
                            </Box>
                            <Box flex={1}>
                                <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Last Ayah</Text>
                                <Flex bg="#0B1116" p={2} rounded="xl" align="center" justify="space-between" border="1px solid" borderColor="whiteAlpha.100">
                                    <Button size="sm" variant="ghost" color="#00C6D1" onClick={() => dispatch(updateQuranProgress({ lastAyah: Math.max(0, (progress.lastAyah || 0) - 1) }))}>-</Button>
                                    <Text fontWeight="bold">{progress.lastAyah || 0}</Text>
                                    <Button size="sm" variant="ghost" color="#00C6D1" onClick={() => dispatch(updateQuranProgress({ lastAyah: (progress.lastAyah || 0) + 1 }))}>+</Button>
                                </Flex>
                            </Box>
                        </Flex>

                        <Box mt={2}>
                            <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Tafseer Note</Text>
                            <Input
                                placeholder="Reflect on what you read today..."
                                bg="#0B1116"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                                color="white"
                                p={4}
                                rounded="xl"
                            />
                        </Box>

                        <Button w="full" bg="#00C6D1" color="#0B1116" rounded="full" py={6} _hover={{ bg: "#00A8B3" }} onClick={() => alert("Progress Saved!")}>
                            <FaCheck style={{ marginRight: '8px' }} /> Save Log
                        </Button>
                    </VStack>
                </Box>

                {/* Word of the Day */}
                <Box bg="#151F26" p={6} rounded="3xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" mb={4}>
                        <Text fontSize="xs" color="gray.400" letterSpacing="widest" textTransform="uppercase">Word of the Day</Text>
                        <FaBookmark color="#00C6D1" />
                    </Flex>

                    <Flex align="center" gap={4} mb={4}>
                        <Flex w={16} h={16} rounded="full" bg="#0B1116" align="center" justify="center" border="1px solid" borderColor="whiteAlpha.100">
                            <Text fontFamily="'Traditional Arabic', serif" fontSize="2xl" color="#00C6D1">صبر</Text>
                        </Flex>
                        <Box>
                            <Heading size="lg" fontFamily="'Playfair Display', serif">Sabr</Heading>
                            <Text fontSize="sm" color="gray.500" fontStyle="italic">Root: s-b-r</Text>
                        </Box>
                    </Flex>

                    <Text color="gray.300" fontSize="sm" lineHeight="tall">
                        <Text as="span" color="#00C6D1" fontWeight="bold">Meaning: </Text>
                        Patience, perseverance, and endurance. It is not merely waiting, but remaining steadfast in faith during difficulties.
                    </Text>
                </Box>
            </Container>
        </Box>
    )
}

export default Quran
