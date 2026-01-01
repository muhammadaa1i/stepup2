import { Anchor, Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../authApi"
import './login.scss'

type LoginFormData = {
  phone: string
  password: string
}

interface LoginFormProps {
  redirectTo?: string
  onSuccess?: () => void
  showRegisterLink?: boolean
  registerPath?: string  // If provided, show link; if undefined, hide it
  containerSize?: number
}

export default function LoginForm({
  redirectTo = '/',
  onSuccess,
  registerPath = '/register',
  containerSize = 420,
}: LoginFormProps) {
  const [login, { isLoading, isSuccess }] = useLoginMutation()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.()
      navigate(redirectTo)
    }
  }, [isSuccess, navigate, onSuccess, redirectTo])

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap()
      setErrorMessage('')
    } catch (err: any) {
      setErrorMessage(err?.data?.message || 'Login failed')
    }
  }

  return (
    <Container size={containerSize} className="loginPage">
      <Title order={2} ta="center" mb="md">Welcome back</Title>

      <Paper withBorder shadow="sm" p="lg" radius="md">
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="sm">
            <TextInput
              label="Phone"
              placeholder="Phone number"
              type="tel"
              inputMode="numeric"
              withAsterisk
              error={errors.phone?.message}
              {...register('phone', { required: 'Phone is required' })}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              withAsterisk
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />

            {errorMessage && <Text c="red" size="sm">{errorMessage}</Text>}

            <Button type="submit" fullWidth size="md" loading={isLoading}>
              Login
            </Button>

            {registerPath && (
              <>
                <Anchor component={Link} to={registerPath} className="authHint" size="sm" c="dimmed" ta="center">
                  Don't have account yet?
                </Anchor>

                <Anchor className="authLink" ta="center" component={Link} to={registerPath}>
                  Go to register
                </Anchor>
              </>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}