export interface User {
    id?: string
    name: string
    phone: string
    is_admin?: boolean
}

export interface RegisterPayload {
    name: string
    phone: string
    password: string
    confirm_password: string
}

export interface LoginPayload {
    phone: string
    password: string
}

export interface AuthData {
    user: User
    accessToken: string
    refreshToken: string
}

export interface AuthResponse {
    success: boolean
    message: string
    data: AuthData
}