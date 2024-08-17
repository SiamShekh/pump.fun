import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TokenListApi = createApi({
    reducerPath: 'TokenListApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://block-cors.vercel.app" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
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
        HomeInformission: builder.query({
            query: () => ({
                url: '/home-informission',
            })
        }),
        ChartInfo: builder.query({
            query: (arg) => ({
                url: '/charts',
                params: {ca: arg} 
            })
        }),
    }),

});

export const { useChartInfoQuery,useTopQuery, useNewQuery, useTopGainerQuery, usePopulerQuery, useHomeInformissionQuery } = TokenListApi;