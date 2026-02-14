import { Box, Button, Container, Heading, Text, VStack, Stack, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBookOpen, FaMoon, FaPray, FaHands } from 'react-icons/fa'

const MotionBox = motion(Box)

const Feature = ({ icon, title, text }: { icon: React.ReactElement, title: string, text: string }) => (
    <VStack
        bg="white"
        p={6}
        rounded="xl"
        shadow="md"
        align="start"
        gap={4}
        height="100%"
        _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
        transition="all 0.3s"
        color="gray.800"
    >
        <Box color="#D4AF37" fontSize="2xl">
            {icon}
        </Box>
        <Heading size="md" fontFamily="'Playfair Display', serif" color="#0F4C5C">
            {title}
        </Heading>
        <Text color="gray.600" fontSize="sm">
            {text}
        </Text>
    </VStack>
)

const LandingPage = () => {
    return (
        <Box bg="#F5F1E8" minH="100vh" color="#2C3E50">
            {/* Hero Section */}
            <Box bg="#0F4C5C" color="#F5F1E8" pt={20} pb={32} px={4} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    opacity={0.1}
                    bgImage="url('https://www.transparenttextures.com/patterns/arabesque.png')"
                />
                <Container maxW="container.xl" position="relative" zIndex={1}>
                    <VStack gap={8} textAlign="center" maxW="2xl" mx="auto">
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Heading
                                as="h1"
                                size="4xl"
                                fontFamily="'Playfair Display', serif"
                                mb={4}
                                lineHeight="1.2"
                            >
                                Ramadan Reflections
                            </Heading>
                            <Text fontSize="xl" opacity={0.9} fontWeight="light">
                                Your holistic digital companion for a mindful, spiritual, and balanced Ramadan.
                            </Text>
                        </MotionBox>

                        <MotionBox
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Link to="/setup">
                                <Button
                                    size="lg"
                                    bg="#D4AF37"
                                    color="#F5F1E8"
                                    _hover={{ bg: "#C5A028" }}
                                    px={10}
                                    py={8}
                                    fontSize="xl"
                                    rounded="full"
                                    shadow="xl"
                                >
                                    TRY NOW
                                </Button>
                            </Link>
                        </MotionBox>
                    </VStack>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxW="container.xl" mt="-20" position="relative" zIndex={2} mb={20}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
                    <Feature
                        icon={<FaPray />}
                        title="Prayer Tracker"
                        text="Track your daily prayers with ease, ensuring you never miss a moment of connection."
                    />
                    <Feature
                        icon={<FaMoon />}
                        title="Mindful Journaling"
                        text="Reflect on your day, track your mood, and record your spiritual growth."
                    />
                    <Feature
                        icon={<FaBookOpen />}
                        title="Quran Progress"
                        text="Visualize your recitation journey and save verses that touch your heart."
                    />
                    <Feature
                        icon={<FaHands />}
                        title="Dua Vault"
                        text="Organize your supplications and focus during the precious moments before Iftar."
                    />
                </SimpleGrid>
            </Container>

            {/* Benefits / Why Use Section */}
            <Box py={20} bg="white">
                <Container maxW="container.xl">
                    <Stack direction={{ base: "column", md: "row" }} gap={12} align="center">
                        <Box flex={1}>
                            <Heading color="#0F4C5C" fontFamily="'Playfair Display', serif" mb={6}>
                                More Than Just a Tracker
                            </Heading>
                            <Text fontSize="lg" color="gray.600" mb={4}>
                                Unlike standard apps that just tick boxes, Ramadan Reflections focuses on the <strong>quality</strong> of your experience.
                            </Text>
                            <Text fontSize="lg" color="gray.600">
                                Whether you are a busy professional needing efficiency, or a spiritual seeker wanting depth, this companion adapts to your journey.
                            </Text>
                        </Box>
                        <Box flex={1} bg="#F5F1E8" p={10} rounded="2xl" position="relative">
                            <Heading size="lg" color="#0F4C5C" fontFamily="'Playfair Display', serif" mb={4}>
                                "Ihsaan, Sakinah, Clarity"
                            </Heading>
                            <Text fontStyle="italic" color="gray.700">
                                Built on the principles of excellence and tranquility, helping you verify that your fasting positively impacts your spiritual and physical well-being.
                            </Text>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Final CTA */}
            <Box py={20} textAlign="center">
                <Heading size="xl" color="#0F4C5C" fontFamily="'Playfair Display', serif" mb={8}>
                    Ready for your best Ramadan yet?
                </Heading>
                <Link to="/setup">
                    <Button
                        size="lg"
                        bg="#0F4C5C"
                        color="#F5F1E8"
                        _hover={{ bg: "#093642" }}
                        rounded="full"
                        px={10}
                    >
                        Start Your Journey
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default LandingPage
