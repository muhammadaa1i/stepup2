import { Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useRegisterMutation } from "../authApi"
import { loginSuccess } from "../authSlice"
import './register.scss'

type RegisterFormData = {
    name: string
    phone: string
    password: string
    confirm_password: string
}

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [registerUser] = useRegisterMutation()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()
    const password = watch('password')

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await registerUser(data).unwrap()
            dispatch(loginSuccess(response))
        } catch (error) {
            console.error('Register failed:', error)
        }
    }

    return (
        <Container size={420} className="registerPage">
            <Title order={2} ta="center" mb="md">Create account</Title>

            <Paper withBorder shadow="sm" p="lg" radius="md">
                <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap="sm">
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name?.message && (
                            <Text c="red" size="xs">
                                {errors.name.message}
                            </Text>
                        )}

                        <TextInput
                            label="Phone"
                            placeholder="Phone number"
                            type="tel"
                            inputMode="numeric"
                            {...register('phone', { required: 'Phone is required' })}
                        />
                        {errors.phone?.message && (
                            <Text c="red" size="xs">
                                {errors.phone.message}
                            </Text>
                        )}

                        <PasswordInput
                            label="Password"
                            placeholder="Password"
                            required
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Min 6 characters' }
                            })}
                        />
                        {errors.password?.message && (
                            <Text c="red" size="xs">
                                {errors.password.message}
                            </Text>
                        )}

                        <PasswordInput
                            label="Confirm password"
                            placeholder="Confirm password"
                            {...register('confirm_password', {
                                required: 'Confirm password is required',
                                validate: (value) => value === password || 'Passwords do not match'
                            })}
                        />
                        {errors.confirm_password?.message && (
                            <Text c="red" size="xs">
                                {errors.confirm_password.message}
                            </Text>
                        )}

                        <Button type="submit" fullWidth size="md">
                            Register
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default RegisterForm