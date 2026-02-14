import { Box, VStack, Heading, Text, Flex, IconButton, Button, Textarea, Badge, Container } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { addDua, removeDua } from '../features/content/contentSlice'
import { useState } from 'react'
import { FaTrash, FaMoon, FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const MotionBox = motion(Box)

const Dua = () => {
    const dispatch = useDispatch()
    const duaList = useSelector((state: RootState) => state.content.duaList)
    const [newDuaText, setNewDuaText] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [isThinkingMode, setIsThinkingMode] = useState(false)
    const [currentFocusIndex, setCurrentFocusIndex] = useState(0)
    const [filter, setFilter] = useState('All')

    const filters = ['All', 'Family', 'Self', 'Ummah']
    const categories = ['general', 'family', 'self', 'ummah']

    const handleAdd = () => {
        if (newDuaText.trim()) {
            dispatch(addDua({
                id: Date.now().toString(),
                text: newDuaText,
                category: selectedCategory
            }))
            setNewDuaText('')
        }
    }

    const filteredDuas = filter === 'All' ? duaList : duaList.filter(d => d.category?.toLowerCase() === filter.toLowerCase())

    return (
        <Box bg="#0B1116" minH="100vh" color="white" pb={32}>
            {/* Iftar Mode Overlay */}
            <AnimatePresence>
                {isThinkingMode && (
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        position="fixed"
                        top={0} left={0} right={0} bottom={0}
                        bg="#0B1116"
                        zIndex={200}
                        p={8}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <IconButton
                            aria-label="Close"
                            position="absolute"
                            top={8}
                            right={8}
                            variant="ghost"
                            color="gray.500"
                            onClick={() => setIsThinkingMode(false)}
                        >
                            <FaTimes size={24} />
                        </IconButton>

                        <Text fontSize="sm" mb={4} color="#00C6D1" letterSpacing="widest" textTransform="uppercase">Iftar Focus Mode</Text>

                        <Heading size="2xl" fontFamily="'Playfair Display', serif" mb={8} lineHeight="1.4" maxW="lg">
                            "{duaList[currentFocusIndex]?.text || "Your Dua List is Empty"}"
                        </Heading>

                        {duaList.length > 0 && (
                            <Flex gap={4}>
                                <Button
                                    variant="outline"
                                    color="white"
                                    borderColor="whiteAlpha.200"
                                    _hover={{ bg: "whiteAlpha.100" }}
                                    onClick={() => setCurrentFocusIndex((prev) => (prev - 1 + duaList.length) % duaList.length)}
                                >
                                    Prev
                                </Button>
                                <Button
                                    bg="#00C6D1"
                                    color="#0B1116"
                                    _hover={{ bg: "#00A8B3" }}
                                    onClick={() => setCurrentFocusIndex((prev) => (prev + 1) % duaList.length)}
                                >
                                    Next Dua
                                </Button>
                            </Flex>
                        )}
                    </MotionBox>
                )}
            </AnimatePresence>

            <Container maxW="container.md" px={4} py={4}>
                <Flex justify="space-between" align="center" mb={2}>
                    <Heading size="xl" fontFamily="'Playfair Display', serif">
                        Dua Vault
                    </Heading>
                    {/* Placeholder for future modal trigger if needed */}
                </Flex>
                <Text color="gray.400" mb={6} fontSize="sm">Curate your spiritual aspirations</Text>

                {/* Filters */}
                <Flex gap={2} mb={8} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    {filters.map(f => (
                        <Button
                            key={f}
                            size="sm"
                            rounded="full"
                            px={6}
                            bg={filter === f ? "#00C6D1" : "#151F26"}
                            color={filter === f ? "#0B1116" : "gray.400"}
                            _hover={{ bg: filter === f ? "#00A8B3" : "#1E2A35" }}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </Button>
                    ))}
                </Flex>

                {/* List */}
                <VStack gap={4} mb={24} align="stretch">
                    {/* Add Input */}
                    <Box bg="#151F26" p={4} rounded="2xl" border="1px dashed" borderColor="gray.700">
                        <Textarea
                            placeholder="Add a new Dua..."
                            value={newDuaText}
                            onChange={(e) => setNewDuaText(e.target.value)}
                            bg="transparent"
                            border="none"
                            _focus={{ ring: 0 }}
                            color="white"
                            rows={2}
                            mb={2}
                        />
                        <Flex justify="space-between" align="center">
                            <Flex gap={2}>
                                {categories.slice(1).map(cat => (
                                    <Badge
                                        key={cat}
                                        cursor="pointer"
                                        bg={selectedCategory === cat ? "#00C6D1" : "whiteAlpha.100"}
                                        color={selectedCategory === cat ? "#0B1116" : "gray.500"}
                                        onClick={() => setSelectedCategory(cat)}
                                        textTransform="capitalize"
                                        px={2} py={1} rounded="md"
                                    >
                                        {cat}
                                    </Badge>
                                ))}
                            </Flex>
                            <Button size="xs" colorScheme="cyan" onClick={handleAdd} disabled={!newDuaText.trim()}>Save</Button>
                        </Flex>
                    </Box>

                    {filteredDuas.map((dua) => (
                        <Box key={dua.id} bg="#151F26" p={5} rounded="2xl" position="relative" border="1px solid" borderColor="whiteAlpha.50">
                            <Badge
                                mb={2}
                                bg={dua.category === 'family' ? 'green.900' : dua.category === 'self' ? 'blue.900' : 'purple.900'}
                                color={dua.category === 'family' ? 'green.300' : dua.category === 'self' ? 'blue.300' : 'purple.300'}
                                px={2} py={0.5} rounded="md" fontSize="xs" textTransform="uppercase"
                            >
                                {dua.category || 'General'}
                            </Badge>
                            <Heading size="md" fontFamily="'Playfair Display', serif" mb={2} color="white">
                                {dua.text.length > 30 ? dua.text.substring(0, 30) + "..." : dua.text}
                            </Heading>
                            <Text fontSize="sm" color="gray.400" lineHeight="tall">
                                {dua.text}
                            </Text>

                            <IconButton
                                aria-label="Delete"
                                size="xs"
                                variant="ghost"
                                color="gray.600"
                                position="absolute"
                                top={4}
                                right={4}
                                _hover={{ color: "red.400" }}
                                onClick={() => dispatch(removeDua(dua.id))}
                            >
                                <FaTrash />
                            </IconButton>
                        </Box>
                    ))}
                </VStack>

                {/* Floating Action Button for Iftar Mode */}
                <Box position="fixed" bottom={24} left={0} right={0} px={4} maxW="container.md" mx="auto" pointerEvents="none"> {/* Container constraints for FAB */}
                    <Button
                        size="lg"
                        w="full"
                        h="56px"
                        bg="#00C6D1"
                        color="#0B1116"
                        rounded="full"
                        shadow="lg"
                        fontSize="lg"
                        fontWeight="bold"
                        onClick={() => setIsThinkingMode(true)}
                        pointerEvents="auto"
                        _hover={{ bg: "#00A8B3" }}
                    >
                        <Box as="span" mr={2}><FaMoon /></Box>
                        Enter Iftar Mode
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default Dua
