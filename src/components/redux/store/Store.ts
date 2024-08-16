import { configureStore } from "@reduxjs/toolkit";
import WalletSlice from "../slice/WalletSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const PersistedReducer = persistReducer(persistConfig, WalletSlice.reducer);

export const WalletStore = configureStore({
    reducer: {
        "Wallet": PersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(WalletStore);

export type AppRoot = ReturnType<typeof WalletStore.getState>;
export type dispatch = typeof WalletStore.dispatch;