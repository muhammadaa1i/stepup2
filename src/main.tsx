import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { store } from './store/store'

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Arial, sans-serif',
  components: {
    Button: {
      defaultProps: {
        color: 'dark',
      },
    },
    Anchor: {
      defaultProps: {
        c: 'dark',
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position='top-center' autoClose={5000} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  </StrictMode>,
)
