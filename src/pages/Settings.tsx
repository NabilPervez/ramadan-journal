import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { updateSettings } from '../features/settings/settingsSlice'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const settings = useSelector((state: RootState) => state.settings)

    const handleReset = () => {
        if (confirm("Are you sure you want to reset setup?")) {
            dispatch(updateSettings({ isSetupComplete: false, location: null }))
            navigate('/setup')
        }
    }

    return (
        <Box p={4} pb={24}>
            <Heading size="xl" mb={6} color="#0F4C5C" fontFamily="'Playfair Display', serif">
                Settings
            </Heading>

            <Box bg="white" p={6} rounded="2xl" shadow="sm" mb={4}>
                <Heading size="md" mb={4} color="#0F4C5C">Location</Heading>
                {settings.location ? (
                    <Text>
                        Lat: {settings.location.lat.toFixed(2)}, Lng: {settings.location.lng.toFixed(2)}
                    </Text>
                ) : (
                    <Text color="red.500">Not Set</Text>
                )}
            </Box>

            <Box bg="white" p={6} rounded="2xl" shadow="sm" mb={4}>
                <Heading size="md" mb={4} color="#0F4C5C">Preferences</Heading>
                <Flex justify="space-between" align="center" mb={4}>
                    <Text>Calculation Method</Text>
                    <Text fontWeight="bold">{settings.calculationMethod}</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                    <Text>Madhab</Text>
                    <Text fontWeight="bold">{settings.madhab}</Text>
                </Flex>
            </Box>

            <Button colorScheme="red" variant="outline" w="full" onClick={handleReset}>
                Reset App Data
            </Button>
        </Box>
    )
}

export default Settings
