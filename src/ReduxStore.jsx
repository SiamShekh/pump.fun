import { configureStore } from '@reduxjs/toolkit'
import { TokenListApi } from './components/rtk/TokenListApi'

export const ReduxStore = configureStore({
    reducer: {
        [TokenListApi.reducerPath]: TokenListApi.reducer
    },
    middleware: (getDefault) => getDefault().concat(TokenListApi.middleware)
})
