import type { AppDispatch } from '@/store/store'
import { loginSuccess, logout } from '../slice/authSlice'
import type { AuthData } from '../types'
import { tokenStorage } from './tokenStorage'

export const handleAuthSuccess = (authData: AuthData, dispatch: AppDispatch) => {
    tokenStorage.setAccessToken(authData.accessToken)
    tokenStorage.setRefreshToken(authData.refreshToken)
    dispatch(loginSuccess({
        user: authData.user,
        accessToken: authData.accessToken
    }))
}

export const handleLogout = (dispatch: AppDispatch) => {
    tokenStorage.clearTokens()
    dispatch(logout())
}