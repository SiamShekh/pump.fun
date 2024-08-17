import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TokenListApi = createApi({
    reducerPath: 'TokenListApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://block-cors.vercel.app" }),
    endpoints: (builder) => ({
        Top: builder.query({
            query: () => ({
                url: '/list',
            })
        }),
        New: builder.query({
            query: () => ({
                url: '/new',
            })
        }),
        TopGainer: builder.query({
            query: () => ({
                url: '/top-gainer',
            })
        }),
        Populer: builder.query({
            query: () => ({
                url: '/popular',
            })
        }),
    }),

});

export const { useTopQuery, useNewQuery, useTopGainerQuery, usePopulerQuery } = TokenListApi;