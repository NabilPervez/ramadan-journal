import { Box, VStack, Heading, Text, Progress, Flex, Input, Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateQuranProgress } from '../features/content/contentSlice'

const Quran = () => {
    const dispatch = useDispatch()
    const progress = useSelector((state: RootState) => state.content.quranProgress)

    const percentage = ((progress.currentJuz || 1) / 30) * 100

    return (
        <Box p={4} pb={24}>
            <Heading size="xl" mb={6} color="#0F4C5C" fontFamily="'Playfair Display', serif">
                Quran Tracker
            </Heading>

            <Box bg="white" p={6} rounded="2xl" shadow="sm" mb={8}>
                <Flex justify="space-between" align="baseline" mb={2}>
                    <Text color="gray.500" fontWeight="medium">Current Progress</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#D4AF37">
                        {Math.round(percentage)}%
                    </Text>
                </Flex>
                <Progress.Root value={percentage} colorScheme="teal" size="lg" rounded="full">
                    <Progress.Track bg="gray.100">
                        <Progress.Range bg="#0F4C5C" />
                    </Progress.Track>
                </Progress.Root>
                <Text mt={2} fontSize="sm" color="gray.400">
                    Juz {progress.currentJuz} of 30
                </Text>

                <Flex mt={6} gap={4}>
                    <Button
                        flex={1}
                        size="sm"
                        variant="subtle"
                        colorScheme="teal"
                        onClick={() => dispatch(updateQuranProgress({ currentJuz: Math.max(1, progress.currentJuz - 1) }))}
                    >
                        - Juz
                    </Button>
                    <Button
                        flex={1}
                        size="sm"
                        variant="solid"
                        bg="#0F4C5C"
                        color="white"
                        onClick={() => dispatch(updateQuranProgress({ currentJuz: Math.min(30, progress.currentJuz + 1) }))}
                    >
                        + Juz
                    </Button>
                </Flex>
            </Box>

            <Box bg="white" p={6} rounded="2xl" shadow="sm">
                <Text fontWeight="bold" mb={4} color="#0F4C5C">Log Reading</Text>
                <VStack gap={4} align="stretch">
                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.600">Surah Number (1-114)</Text>
                        <Input
                            type="number"
                            min={1}
                            max={114}
                            value={progress.lastSurah}
                            onChange={(e) => dispatch(updateQuranProgress({ lastSurah: parseInt(e.target.value) || 1 }))}
                        />
                    </Box>
                    <Box>
                        <Text fontSize="sm" mb={1} color="gray.600">Ayah Number</Text>
                        <Input
                            type="number"
                            min={1}
                            value={progress.lastAyah}
                            onChange={(e) => dispatch(updateQuranProgress({ lastAyah: parseInt(e.target.value) || 1 }))}
                        />
                    </Box>
                    <Box borderTop="1px solid" borderColor="gray.100" pt={4}>
                        <Text fontSize="sm" mb={2} color="#D4AF37" fontStyle="italic">
                            "Recite in the name of your Lord who created..."
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </Box>
    )
}

export default Quran
