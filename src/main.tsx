import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Arial, sans-serif',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
