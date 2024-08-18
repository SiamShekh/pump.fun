import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { ReduxStore } from './ReduxStore'
import { RouterProvider } from 'react-router-dom'
import MainRoutes from './routes'
import AppWalletProvider from './components/scripts/AppWalletProvider'
// import { LedgerWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TrezorWalletAdapter, TrustWalletAdapter, WalletConnectWalletAdapter } from '@solana/wallet-adapter-wallets'
// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
// import { clusterApiUrl } from '@solana/web3.js'
// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
// import '@solana/wallet-adapter-react-ui/styles.css';

// const wallets = [

// ];


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppWalletProvider>
            <Provider store={ReduxStore} >
                <RouterProvider router={MainRoutes} />
            </Provider>
        </AppWalletProvider>
        {/* <ConnectionProvider endpoint={clusterApiUrl('mainnet-beta')}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <Provider store={ReduxStore}>
                        <RouterProvider router={MainRoutes} />
                    </Provider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider> */}
    </React.StrictMode>,
)
