import { configureStore } from '@reduxjs/toolkit'
import { TokenListApi } from './components/rtk/TokenListApi'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import ReduxLoginSlice from './components/slice/LoginSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const LoginReducer = persistReducer(persistConfig, ReduxLoginSlice.reducer);

export const ReduxStore = configureStore({
    reducer: {
        [TokenListApi.reducerPath]: TokenListApi.reducer,
        LoginReducer

    },

    middleware: (getDefault) => getDefault({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(TokenListApi.middleware)
});

export const persistor = persistStore(ReduxStore);
export default ReduxStore;
