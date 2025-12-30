import { Anchor, Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { loginSuccess } from "../authSlice"
import './login.scss'

type LoginFormData = {
  phone: string
  password: string
}

export default function LoginForm() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const onSubmit = (data: LoginFormData) => {
    const response = {
      user: {
        name: 'User',
        phone: data.phone,
      },
      accessToken: 'dummy-token',
    }

    dispatch(loginSuccess(response))
  }

  return (
    <Container size={420} className="loginPage">
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

            <Button type="submit" fullWidth size="md">
              Login
            </Button>

            <Anchor component={Link} to="/register" className="authHint" size="sm" c="dimmed" ta="center">
              Don't have account yet?
            </Anchor>
            <Anchor className="authLink" ta="center" component={Link} to="/register">
              Go to register
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}