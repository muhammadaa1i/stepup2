import { Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../authApi"
import './register.scss'

type RegisterFormData = {
    name: string
    phone: string
    password: string
    confirm_password: string
}

interface RegisterFormProps {
    redirectTo?: string
    onSuccess?: () => void
    containerSize?: number
}

const RegisterForm = ({ redirectTo, onSuccess, containerSize = 420 }: RegisterFormProps) => {
    const [registerUser, { isLoading, isSuccess }] = useRegisterMutation()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()
    const password = watch('password')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isSuccess) {
            onSuccess?.()
            navigate(redirectTo || '/')
        }
    }, [isSuccess, redirectTo, onSuccess, navigate])

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data).unwrap()
            setErrorMessage('')
        } catch (err: any) {
            setErrorMessage(err?.data?.message || 'Registration failed')
        }
    }

    return (
        <Container size={containerSize} className="registerPage">
            <Title order={2} ta="center" mb="md">Create account</Title>

            <Paper withBorder shadow="sm" p="lg" radius="md" className="registerPaper">
                <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap="sm">
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            error={errors.name?.message}
                        />

                        <TextInput
                            label="Phone"
                            placeholder="Phone number"
                            type="tel"
                            inputMode="numeric"
                            {...register('phone', { required: 'Phone is required' })}
                            error={errors.phone?.message}
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Password"
                            required
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Min 6 characters' }
                            })}
                            error={errors.password?.message}
                        />
                        <PasswordInput
                            label="Confirm password"
                            placeholder="Confirm password"
                            {...register('confirm_password', {
                                required: 'Confirm password is required',
                                validate: (value) => value === password || 'Passwords do not match'
                            })}
                            error={errors.confirm_password?.message}
                        />

                        {errorMessage && <Text c="red" size="sm">{errorMessage}</Text>}

                        <Button loading={isLoading} type="submit" fullWidth size="md">
                            Register
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default RegisterForm