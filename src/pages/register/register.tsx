import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm"
import { useRegister } from "@/features/auth/hooks/useRegister"
import { Container, Paper, Title } from "@mantine/core"
import './register.scss'

interface RegisterPageProps {
    redirectTo?: string
    onSuccess?: () => void
    containerSize?: number
}

export default function RegisterPage({ redirectTo, onSuccess, containerSize = 420 }: RegisterPageProps) {
    const { handleRegister, isLoading } = useRegister({ redirectTo, onSuccess })

    return (
        <Container size={containerSize} className="registerPage">
            <Title order={2} ta="center" mb="md">Create account</Title>

            <Paper withBorder shadow="sm" p="lg" radius="md" className="registerPaper">
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            </Paper>
        </Container>
    )
}
