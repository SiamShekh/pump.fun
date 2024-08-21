/* eslint-disable react-refresh/only-export-components */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TokenListApi = createApi({
    reducerPath: 'TokenListApi',
    tagTypes: ["setting"],
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
        }),
        PingUserLogin: builder.mutation({
            query: (arg) => ({
                url: '/login/admin',
                method: "POST",
                body: arg
            })
        }),
        SettingUpdate: builder.mutation({
            query: (arg) => ({
                url: '/login/admin/update',
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["setting"]
        }),
        SettingInfo: builder.query({
            query: () => ({
                url: '/login/setting/info'
            })
        }),
        DashboardInfo: builder.query({
            query: () => ({
                url: '/admin/dashboard'
            })
        }),
        AdminSettingInformission: builder.query({
            query: () => ({
                url: '/login/info'
            }),
            providesTags: ["setting"]
        }),
    }),

});

export const { useSettingUpdateMutation, useAdminSettingInformissionQuery, useSettingInfoQuery, usePingUserLoginMutation, useMetaDataQuery, useVirtualWalletsListQuery, useSwappedQuery, useProfileQuery, useCreateWalletsQuery, useFindWalletsQuery, useDetailsQuery, useDashboardInfoQuery, useTopQuery, useNewQuery, useTopGainerQuery, usePopulerQuery, useHomeInformissionQuery } = TokenListApi;