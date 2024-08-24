import  { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {  PhantomWalletAdapter, SafePalWalletAdapter, SolflareWalletAdapter, TrezorWalletAdapter, TrustWalletAdapter, WalletConnectWalletAdapter } from '@solana/wallet-adapter-wallets';

import("@solana/wallet-adapter-react-ui/styles.css");


export default function AppWalletProvider({ children }) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
      new WalletConnectWalletAdapter(),
      new TrezorWalletAdapter(),
      new SafePalWalletAdapter()
    ],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}