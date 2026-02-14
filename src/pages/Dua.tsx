import { Box, VStack, Heading, Text, Flex, IconButton, Button, Textarea } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { addDua, removeDua } from '../features/content/contentSlice'
import { useState } from 'react'
import { FaTrash, FaPlus, FaPray } from 'react-icons/fa'

const Dua = () => {
    const dispatch = useDispatch()
    const duaList = useSelector((state: RootState) => state.content.duaList)
    const [newDuaText, setNewDuaText] = useState('')
    const [isThinkingMode, setIsThinkingMode] = useState(false)
    const [currentFocusIndex, setCurrentFocusIndex] = useState(0)

    const handleAdd = () => {
        if (newDuaText.trim()) {
            dispatch(addDua({
                id: Date.now().toString(),
                text: newDuaText,
                category: 'general'
            }))
            setNewDuaText('')
        }
    }

    const enterMode = () => {
        if (duaList.length > 0) {
            setIsThinkingMode(true)
            setCurrentFocusIndex(0)
        } else {
            alert("Add some Duas first!")
        }
    }

    if (isThinkingMode) {
        const currentDua = duaList[currentFocusIndex]
        return (
            <Box
                position="fixed"
                top={0} left={0} right={0} bottom={0}
                bg="#0F4C5C"
                color="#F5F1E8"
                zIndex={200}
                p={8}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                <Text fontSize="xl" mb={4} opacity={0.7} letterSpacing="widest">IFTAR FOCUS MODE</Text>

                <Heading size="3xl" fontFamily="'Playfair Display', serif" mb={8} lineHeight="1.4">
                    "{currentDua?.text}"
                </Heading>

                <Flex gap={4}>
                    <Button
                        variant="outline"
                        color="white"
                        borderColor="whiteAlpha.400"
                        onClick={() => setIsThinkingMode(false)}
                    >
                        Exit
                    </Button>
                    <Button
                        bg="#D4AF37"
                        color="#F5F1E8"
                        onClick={() => setCurrentFocusIndex((prev) => (prev + 1) % duaList.length)}
                    >
                        Next Dua
                    </Button>
                </Flex>
            </Box>
        )
    }

    return (
        <Box p={4} pb={24}>
            <Heading size="xl" mb={6} color="#0F4C5C" fontFamily="'Playfair Display', serif">
                Dua Vault
            </Heading>

            {/* Quick Add */}
            <Box bg="white" p={6} rounded="2xl" shadow="sm" mb={8}>
                <VStack align="stretch" gap={3}>
                    <Textarea
                        placeholder="Add a new Dua here..."
                        value={newDuaText}
                        onChange={(e) => setNewDuaText(e.target.value)}
                        bg="gray.50"
                        rows={3}
                    />
                    <Button
                        bg="#0F4C5C"
                        color="white"
                        onClick={handleAdd}
                        disabled={!newDuaText.trim()}
                    >
                        <Box as="span" mr={2}><FaPlus /></Box>
                        Add to Vault
                    </Button>
                </VStack>
            </Box>

            {/* List */}
            <VStack gap={4} mb={8} align="stretch">
                {duaList.length === 0 ? (
                    <Text textAlign="center" color="gray.400" py={8}>No Duas added yet.</Text>
                ) : (
                    duaList.map((dua) => (
                        <Box key={dua.id} bg="white" p={4} rounded="xl" shadow="sm" position="relative">
                            <Text fontSize="lg" fontFamily="'Playfair Display', serif" pr={8} color="#2C3E50">
                                {dua.text}
                            </Text>
                            <IconButton
                                aria-label="Delete"
                                size="xs"
                                colorScheme="red"
                                variant="ghost"
                                position="absolute"
                                top={2}
                                right={2}
                                onClick={() => dispatch(removeDua(dua.id))}
                            >
                                <FaTrash />
                            </IconButton>
                        </Box>
                    ))
                )}
            </VStack>

            {/* Iftar Mode Trigger */}
            <Button
                size="lg"
                w="full"
                h="60px"
                bgGradient="linear(to-r, #D4AF37, #C5A028)"
                color="white"
                rounded="xl"
                shadow="lg"
                onClick={enterMode}
            >
                <Box as="span" mr={2}><FaPray /></Box>
                Enter Iftar Mode
            </Button>
        </Box>
    )
}

export default Dua
