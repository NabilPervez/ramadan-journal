import { Box, VStack, Heading, Text, Flex, Input, Button, Badge } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateQuranProgress } from '../features/content/contentSlice'
import { FaCheck, FaBookmark } from 'react-icons/fa'

const Quran = () => {
    const dispatch = useDispatch()
    const progress = useSelector((state: RootState) => state.content.quranProgress)

    const percentage = ((progress.currentJuz || 1) / 30) * 100

    return (
        <Box p={4} pb={32} bg="#0B1116" minH="100vh" color="white">
            <Flex justify="space-between" align="center" mb={8}>
                {/* Back button placeholder */}
                <Text fontSize="xl">←</Text>
                <Heading size="md" fontFamily="'Playfair Display', serif">My Quran Journey</Heading>
                <Text fontSize="xl">•••</Text>
            </Flex>

            {/* Circular Progress Hero */}
            <Flex justify="center" mb={10} position="relative">
                <Box position="relative" w="200px" h="200px" display="flex" alignItems="center" justifyContent="center">
                    {/* Background Circle */}
                    <Box
                        position="absolute" top={0} left={0} w="full" h="full" rounded="full"
                        border="12px solid" borderColor="#151F26"
                    />
                    {/* Progress Circle (Simplified visual) */}
                    <Box
                        position="absolute" top={0} left={0} w="full" h="full" rounded="full"
                        border="12px solid" borderColor="#00C6D1"
                        borderLeftColor="transparent" borderBottomColor="transparent" // fake 50%
                        transform="rotate(45deg)"
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
                    <Text fontSize="2xl" fontWeight="bold" color="#00C6D1">{progress.currentJuz}</Text>
                    <Text fontSize="xs" color="gray.500" letterSpacing="widest">JUZ</Text>
                </VStack>
                <Box w="1px" h="40px" bg="whiteAlpha.200" />
                <VStack gap={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="#00C6D1">246</Text> {/* Placeholder pages */}
                    <Text fontSize="xs" color="gray.500" letterSpacing="widest">PAGES</Text>
                </VStack>
            </Flex>

            {/* Log Reading Card */}
            <Box bg="#151F26" p={5} rounded="3xl" mb={8}>
                <Flex align="center" gap={2} mb={6}>
                    <Box w="3px" h="16px" bg="#00C6D1" rounded="full" />
                    <Heading size="md">Log Reading</Heading>
                    <Badge ml="auto" bg="#1E2A35" color="#00C6D1" px={3} py={1} rounded="full">Today</Badge>
                </Flex>

                <VStack gap={4} align="stretch">
                    <Box>
                        <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Surah</Text>
                        <Flex bg="#0B1116" p={3} rounded="xl" align="center" justify="space-between" border="1px solid" borderColor="whiteAlpha.100">
                            <Text>Al-Baqarah (The Cow)</Text>
                            <Text color="gray.500">⌄</Text>
                        </Flex>
                        {/* Hidden Real Input for functionality */}
                        <Input
                            type="number"
                            opacity={0} h={0}
                            min={1}
                            max={114}
                            value={progress.lastSurah}
                            onChange={(e) => dispatch(updateQuranProgress({ lastSurah: parseInt(e.target.value) || 1 }))}
                        />
                    </Box>

                    <Flex gap={4}>
                        <Box flex={1}>
                            <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">From Ayah</Text>
                            <Flex bg="#0B1116" p={2} rounded="xl" align="center" justify="space-between" border="1px solid" borderColor="whiteAlpha.100">
                                <Button size="sm" variant="ghost" color="#00C6D1">-</Button>
                                <Text fontWeight="bold">{progress.lastAyah}</Text>
                                <Button size="sm" variant="ghost" color="#00C6D1" onClick={() => dispatch(updateQuranProgress({ lastAyah: (progress.lastAyah || 0) + 1 }))}>+</Button>
                            </Flex>
                        </Box>
                        <Box flex={1}>
                            <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">To Ayah</Text>
                            <Flex bg="#0B1116" p={2} rounded="xl" align="center" justify="space-between" border="1px solid" borderColor="whiteAlpha.100">
                                <Button size="sm" variant="ghost" color="#00C6D1">-</Button>
                                <Text fontWeight="bold">{progress.lastAyah + 10}</Text> {/* Mock */}
                                <Button size="sm" variant="ghost" color="#00C6D1">+</Button>
                            </Flex>
                        </Box>
                    </Flex>

                    <Box mt={2}>
                        <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Tafseer Note</Text>
                        <Box bg="#0B1116" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" minH="80px">
                            <Text color="gray.400" fontSize="sm">Reflect on what you read today...</Text>
                        </Box>
                    </Box>

                    <Button w="full" bg="#00C6D1" color="#0B1116" rounded="full" py={6} _hover={{ bg: "#00A8B3" }}>
                        <FaCheck style={{ marginRight: '8px' }} /> Save Log
                    </Button>
                </VStack>
            </Box>

            {/* Word of the Day */}
            <Box bg="#151F26" p={5} rounded="3xl">
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
        </Box>
    )
}

export default Quran
