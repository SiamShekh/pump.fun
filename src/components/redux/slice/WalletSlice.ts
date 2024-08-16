import { createSlice } from "@reduxjs/toolkit";

const WalletSlice = createSlice({
    name: "Wallet",
    initialState: {
        publicKey: "",
        privateKey: "",
        apiKey: "",
        isModified: false
    },
    reducers: {
        setWallet(state, action) {
            state.publicKey = action.payload.walletPublicKey;
            state.privateKey = action.payload.privateKey;
            state.apiKey = action.payload.apiKey;
            state.isModified = true;
        }
    }
});

export default WalletSlice;
export const { setWallet } = WalletSlice.actions;