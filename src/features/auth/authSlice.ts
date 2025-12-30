import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
    id?: string
    name: string
    phone: string
    is_admin?: boolean
}

interface AuthSlice {
    user: User | null
    accessToken: string | null
    isAuthenticated: boolean
}

const initialState: AuthSlice = {
    user: null,
    accessToken: null,
    isAuthenticated: false
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
        },

        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer