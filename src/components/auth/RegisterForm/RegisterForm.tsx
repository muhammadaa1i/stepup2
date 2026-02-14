import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'

type RegisterFormData = {
    name: string
    phone: string
    password: string
    confirm_password: string
}

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => Promise<void>
    isLoading?: boolean
}

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()
    const password = watch('password')

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

                <Button loading={isLoading} type="submit" fullWidth size="md">
                    Register
                </Button>
            </Stack>
        </form>
    )
}
