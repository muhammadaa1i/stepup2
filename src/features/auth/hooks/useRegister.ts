import { useRegisterMutation } from '@/features/auth/api/authApi'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseRegisterOptions {
    redirectTo?: string
    onSuccess?: () => void
}

export const useRegister = ({ redirectTo = '/', onSuccess }: UseRegisterOptions = {}) => {
    const [registerUser, { isLoading, isSuccess }] = useRegisterMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            onSuccess?.()
            navigate(redirectTo)
        }
    }, [isSuccess, navigate, onSuccess, redirectTo])

    const handleRegister = async (data: {
        name: string
        phone: string
        password: string
        confirm_password: string
    }) => {
        try {
            await registerUser(data).unwrap()
            notifications.show({
                title: 'Success',
                message: 'Account created successfully!',
                color: 'green'
            })
        } catch (err: any) {
            notifications.show({
                title: 'Error',
                message: err?.data?.message || 'Registration failed!',
                color: 'red'
            })
            throw err
        }
    }

    return { handleRegister, isLoading }
}
