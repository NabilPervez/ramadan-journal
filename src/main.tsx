import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
