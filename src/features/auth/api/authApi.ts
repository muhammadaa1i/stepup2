import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/config";
import { tokenStorage } from "../services/tokenStorage";
import { loginSuccess, logout } from "../slice/authSlice";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types";

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
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
                    const { data: response } = await queryFulfilled
                    tokenStorage.setAccessToken(response.data.accessToken)
                    tokenStorage.setRefreshToken(response.data.refreshToken)
                    dispatch(loginSuccess({
                        user: response.data.user,
                        accessToken: response.data.accessToken
                    }))
                } catch (error) {
                    console.error('Registration failed:', error)
                }
            }
        }),

        login: builder.mutation<AuthResponse, LoginPayload>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data: response } = await queryFulfilled
                    tokenStorage.setAccessToken(response.data.accessToken)
                    tokenStorage.setRefreshToken(response.data.refreshToken)
                    dispatch(loginSuccess({
                        user: response.data.user,
                        accessToken: response.data.accessToken
                    }))
                } catch (error) {
                    console.error('Login failed:', error)
                }
            }
        }),

        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: 'auth/refresh',
                method: 'POST'
            })
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    console.error("Logout failed:", error)
                } finally {
                    tokenStorage.clearTokens()
                    dispatch(logout())
                }
            }
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useLogoutMutation } = authApi