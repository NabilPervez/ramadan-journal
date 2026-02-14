import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import { Box, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'

// Placeholder components
const Dashboard = () => <Box p={5}>Dashboard Content</Box>
const Journal = () => <Box p={5}>Journal Content</Box>
const Quran = () => <Box p={5}>Quran Content</Box>
const Dua = () => <Box p={5}>Dua Content</Box>
const Settings = () => <Box p={5}>Settings Content</Box>
const Setup = () => <Box p={5}>Setup Content - <Link to="/">Complete Setup</Link></Box>

// Navigation
const Navigation = () => (
  <Flex
    as="nav"
    bg="teal.600"
    color="white"
    p={4}
    justify="space-around"
    position="fixed"
    bottom={0}
    left={0}
    right={0}
    zIndex={100}
  >
    <Link to="/"><Button variant="ghost" colorPalette="white">Home</Button></Link>
    <Link to="/journal"><Button variant="ghost" colorPalette="white">Journal</Button></Link>
    <Link to="/quran"><Button variant="ghost" colorPalette="white">Quran</Button></Link>
    <Link to="/dua"><Button variant="ghost" colorPalette="white">Dua</Button></Link>
    <Link to="/settings"><Button variant="ghost" colorPalette="white">Settings</Button></Link>
  </Flex>
)

const Layout = () => (
  <Box minH="100vh" bg="#F5F1E8" pb="80px">
    <Outlet />
    <Navigation />
  </Box>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/setup" element={<Setup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
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
