import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TokenListApi = createApi({
    reducerPath: 'TokenListApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://frontend-api.pump.fun/coins?offset=0&limit=500" }),
    endpoints: (builder) => ({
        Top: builder.query({
            query: () => ({
                url: '&sort=last_trade_timestamp&order=DESC&includeNsfw=true',
            })
        })
    }),
    
});

export const { useTopQuery } = TokenListApi;