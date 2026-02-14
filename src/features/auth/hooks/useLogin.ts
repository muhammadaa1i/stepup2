import { useLoginMutation } from '@/features/auth/api/authApi'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseLoginOptions {
    redirectTo?: string
    onSuccess?: () => void
}

export const useLogin = ({ redirectTo = '/', onSuccess }: UseLoginOptions = {}) => {
    const [login, { isLoading, isSuccess }] = useLoginMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            onSuccess?.()
            navigate(redirectTo)
        }
    }, [isSuccess, navigate, onSuccess, redirectTo])

    const handleLogin = async (data: { phone: string; password: string }) => {
        try {
            await login(data).unwrap()
            notifications.show({
                title: 'Success',
                message: 'Logged in successfully!',
                color: 'green'
            })
        } catch (err: any) {
            notifications.show({
                title: 'Error',
                message: err?.data?.message || 'Login failed!',
                color: 'red'
            })
            throw err
        }
    }

    return { handleLogin, isLoading }
}
