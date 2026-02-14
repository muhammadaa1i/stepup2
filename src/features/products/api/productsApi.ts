import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductResponse } from "../types";
import { config } from "@/config/config";

type GetResponse = ProductResponse[]

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiBaseUrl
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<GetResponse, void>({
            query: () => ({
                url: '/products'
            })
        })
    }),
})

export const { useGetProductsQuery } = productsApi