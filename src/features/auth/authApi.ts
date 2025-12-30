import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "./authSlice";

export interface RegisterPayload {
    name: string
    phone: string
    password: string
    confirm_password: string
}

export interface RegisterResponse {
    user: User
    accessToken: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterPayload>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        })
    })
})

export const { useRegisterMutation } = authApi