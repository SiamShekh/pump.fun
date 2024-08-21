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
        Details: builder.query({
            query: (arg) => ({
                url: '/details',
                params: { mint: arg }
            })
        }),
        CreateWallets: builder.query({
            query: (arg) => ({
                url: '/create-wallet',
                params: { pub: arg }
            })
        }),
        FindWallets: builder.query({
            query: (arg) => ({
                url: '/find-wallet',
                params: { pub: arg }
            })
        }),
        Profile: builder.query({
            query: (arg) => ({
                url: '/profile',
                params: { mint: arg }
            })
        }),
        Swapped: builder.query({
            query: () => ({
                url: '/swapped'
            })
        }),
        VirtualWalletsList: builder.query({
            query: () => ({
                url: '/virtual-wallets'
            })
        }),
        MetaData: builder.query({
            query: () => ({
                url: '/metadata'
            })
        })
    }),

});

export const { useMetaDataQuery,useVirtualWalletsListQuery,useSwappedQuery, useProfileQuery, useCreateWalletsQuery, useFindWalletsQuery, useDetailsQuery, useTopQuery, useNewQuery, useTopGainerQuery, usePopulerQuery, useHomeInformissionQuery } = TokenListApi;