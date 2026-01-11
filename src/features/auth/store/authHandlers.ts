import type { AppDispatch } from "../../../store/store";
import type { AuthData } from "../api/authApi";
import { tokenStorage } from "../services/tokenStorage";
import { loginSuccess, logout } from "./authSlice";

export const handleAuthSuccess = (authData: AuthData, dispatch: AppDispatch) => {
    tokenStorage.setAccessToken(authData.accessToken)
    tokenStorage.setAccessToken(authData.refreshToken)
    dispatch(loginSuccess({ user: authData.user, accessToken: authData.accessToken }))
}

export const handleAuthFailure = (dispatch: AppDispatch) => {
    tokenStorage.clearTokens()
    dispatch(logout())
}