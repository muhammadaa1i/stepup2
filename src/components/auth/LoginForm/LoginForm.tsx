import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'

type LoginFormData = {
    phone: string
    password: string
}

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>
    isLoading?: boolean
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

    return (
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

                <Button type="submit" fullWidth size="md" loading={isLoading}>
                    Login
                </Button>
            </Stack>
        </form>
    )
}
