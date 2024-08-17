import './index.css'
import MainRoutes from './routes.jsx'
import ReactDOM from 'react-dom/client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, TrustWalletAdapter, WalletConnectWalletAdapter, LedgerWalletAdapter, TrezorWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReduxStore } from './ReduxStore.jsx';

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new TrustWalletAdapter(),
  new WalletConnectWalletAdapter(),
  new LedgerWalletAdapter(),
  new TrezorWalletAdapter(),
];

const AppWrapper = () => {
  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Provider store={ReduxStore}>
            <RouterProvider router={MainRoutes} />
          </Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);
