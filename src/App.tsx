import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom'
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
const Navigation = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <Flex
      as="nav"
      bg="#0B1116" // Dark BG matching new theme
      color="gray.500"
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
      borderColor="whiteAlpha.100" // Subtle dark border
    >
      <Link to="/dashboard">
        <VStack gap={1} p={2} width="60px">
          <FaHome size={20} color={isActive('/dashboard') ? "#00C6D1" : "gray"} />
          <Text fontSize="xs" fontWeight={isActive('/dashboard') ? "bold" : "normal"} color={isActive('/dashboard') ? "#00C6D1" : "gray"}>Home</Text>
        </VStack>
      </Link>
      <Link to="/journal">
        <VStack gap={1} p={2} width="60px">
          <FaBook size={20} color={isActive('/journal') ? "#00C6D1" : "gray"} />
          <Text fontSize="xs" fontWeight={isActive('/journal') ? "bold" : "normal"} color={isActive('/journal') ? "#00C6D1" : "gray"}>Journal</Text>
        </VStack>
      </Link>
      <Link to="/quran">
        {/* Quran often has a center bigger button, but sticking to nav for now */}
        <VStack gap={1} p={2} width="60px">
          <FaQuran size={20} color={isActive('/quran') ? "#00C6D1" : "gray"} />
          <Text fontSize="xs" fontWeight={isActive('/quran') ? "bold" : "normal"} color={isActive('/quran') ? "#00C6D1" : "gray"}>Quran</Text>
        </VStack>
      </Link>
      <Link to="/dua">
        <VStack gap={1} p={2} width="60px">
          <FaHands size={20} color={isActive('/dua') ? "#00C6D1" : "gray"} />
          <Text fontSize="xs" fontWeight={isActive('/dua') ? "bold" : "normal"} color={isActive('/dua') ? "#00C6D1" : "gray"}>Dua</Text>
        </VStack>
      </Link>
      <Link to="/settings">
        <VStack gap={1} p={2} width="60px">
          <FaCog size={20} color={isActive('/settings') ? "#00C6D1" : "gray"} />
          <Text fontSize="xs" fontWeight={isActive('/settings') ? "bold" : "normal"} color={isActive('/settings') ? "#00C6D1" : "gray"}>Profile</Text>
        </VStack>
      </Link>
    </Flex>
  )
}

const Layout = () => (
  <Box minH="100vh" bg="#0B1116">
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
