import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const ACCESS_TOKEN_KEY = 'accessToken'

export interface User {
    id?: string
    name: string
    phone: string
    is_admin?: boolean
}

interface AuthState {
    user: User | null
    accessToken: string | null
    isAuthenticated: boolean
}

const token = localStorage.getItem(ACCESS_TOKEN_KEY)

const initialState: AuthState = {
    user: null,
    accessToken: token,
    isAuthenticated: !!token
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: User, accessToken: string }>
        ) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true

            localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.accessToken)
        },

        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false

            localStorage.removeItem(ACCESS_TOKEN_KEY)
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer