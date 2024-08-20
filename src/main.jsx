import './index.css'
import MainRoutes from './routes.jsx'
import ReactDOM from 'react-dom/client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import { PhantomWalletAdapter, SolflareWalletAdapter, TrustWalletAdapter, WalletConnectWalletAdapter, LedgerWalletAdapter, TrezorWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReduxStore } from './ReduxStore.jsx';
import AppWalletProvider from './components/scripts/AppWalletProvider.jsx';
import { Toaster } from 'react-hot-toast';

const AppWrapper = () => {
  return (
    <AppWalletProvider>
      <Provider store={ReduxStore}>
        <RouterProvider router={MainRoutes} />
        <Toaster />
      </Provider>
    </AppWalletProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);
