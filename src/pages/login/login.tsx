import { LoginForm } from "@/components/auth/LoginForm/LoginForm"
import { useLogin } from "@/features/auth/hooks/useLogin"
import { Anchor, Container, Paper, Title } from "@mantine/core"
import { Link } from "react-router-dom"
import './login.scss'

interface LoginPageProps {
    redirectTo?: string
    onSuccess?: () => void
    registerPath?: string
    containerSize?: number
}

export default function LoginPage({
    redirectTo = '/',
    onSuccess,
    registerPath = '/register',
    containerSize = 420,
}: LoginPageProps) {
    const { handleLogin, isLoading } = useLogin({ redirectTo, onSuccess })

    return (
        <Container size={containerSize} className="loginPage">
            <Title order={2} ta="center" mb="md">Welcome back</Title>

            <Paper withBorder shadow="sm" p="lg" radius="md">
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

                {registerPath && (
                    <>
                        <Anchor component={Link} to={registerPath} className="authHint" size="sm" c="dimmed" ta="center" mt="sm">
                            Don't have account yet?
                        </Anchor>

                        <Anchor className="authLink" ta="center" component={Link} to={registerPath} mt="xs">
                            Go to register
                        </Anchor>
                    </>
                )}
            </Paper>
        </Container>
    )
}
