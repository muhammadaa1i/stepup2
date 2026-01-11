import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tokenStorage } from "../services/tokenStorage";
import { loginSuccess, logout, type User } from "../store/authSlice";

const BASE_URL = 'https://market-backend-xi.vercel.app/api'

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

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = tokenStorage.getAccessToken()
        if (token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    }
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterPayload>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    const authData = data.data

                    tokenStorage.setAccessToken(authData.accessToken)
                    tokenStorage.setRefreshToken(authData.refreshToken)

                    dispatch(loginSuccess({ user: authData.user, accessToken: authData.accessToken }))
                } catch { }
            }
        }),

        login: builder.mutation<AuthResponse, LoginPayload>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                const { data } = await queryFulfilled
                const authData = data.data

                tokenStorage.setAccessToken(authData.accessToken)
                tokenStorage.setRefreshToken(authData.refreshToken)

                dispatch(loginSuccess({ user: authData.user, accessToken: authData.accessToken }))
            }
        }),

        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: 'auth/refresh',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const authData = data.data

                    tokenStorage.setAccessToken(authData.accessToken)
                    tokenStorage.setRefreshToken(authData.refreshToken)

                    dispatch(loginSuccess({ user: authData.user, accessToken: authData.accessToken }))
                } catch {
                    dispatch(logout())
                }
            }
        })
    })
})

export const { useRegisterMutation, useLoginMutation } = authApi    