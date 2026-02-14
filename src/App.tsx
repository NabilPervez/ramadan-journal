import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import { Box, Flex, VStack, Text } from '@chakra-ui/react'
import Setup from './pages/Setup'
import Dashboard from './pages/Dashboard'
import Journal from './pages/Journal'
import Quran from './pages/Quran'
import Dua from './pages/Dua'
import Settings from './pages/Settings'
import LandingPage from './pages/LandingPage'
import { usePersistence } from './hooks/usePersistence'
import { FaHome, FaBook, FaQuran, FaHands, FaCog } from 'react-icons/fa'

// Navigation
const Navigation = () => (
  <Flex
    as="nav"
    bg="white"
    color="#0F4C5C"
    p={2}
    justify="space-around"
    align="center"
    position="fixed"
    bottom={0}
    left={0}
    right={0}
    zIndex={100}
    pb="env(safe-area-inset-bottom, 20px)"
    borderTop="1px solid"
    borderColor="gray.100"
    shadow="0 -4px 6px -1px rgba(0, 0, 0, 0.05)"
  >
    <Link to="/dashboard">
      <VStack gap={0} p={2}>
        <FaHome size={20} />
        <Text fontSize="xs">Home</Text>
      </VStack>
    </Link>
    <Link to="/journal">
      <VStack gap={0} p={2}>
        <FaBook size={20} />
        <Text fontSize="xs">Journal</Text>
      </VStack>
    </Link>
    <Link to="/quran">
      <VStack gap={0} p={2}>
        <FaQuran size={20} />
        <Text fontSize="xs">Quran</Text>
      </VStack>
    </Link>
    <Link to="/dua">
      <VStack gap={0} p={2}>
        <FaHands size={20} />
        <Text fontSize="xs">Dua</Text>
      </VStack>
    </Link>
    <Link to="/settings">
      <VStack gap={0} p={2}>
        <FaCog size={20} />
        <Text fontSize="xs">Settings</Text>
      </VStack>
    </Link>
  </Flex>
)

const Layout = () => (
  <Box minH="100vh" bg="#F5F1E8">
    <Outlet />
    <Navigation />
  </Box>
)

function App() {
  usePersistence()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<Setup />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/dua" element={<Dua />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
