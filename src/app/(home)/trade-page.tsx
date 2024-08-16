"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, Keypair, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [balance, setBalance] = useState(0);
  const { publicKey, sendTransaction } = useWallet();
  const RPC_ENDPOINT = "https://rpc.ankr.com/solana";
  const web3Connection = new Connection(RPC_ENDPOINT, 'confirmed');

  const { connection } = useConnection();

  async function sendPortalTransaction() {
    const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "publicKey": publicKey?.toBase58(),  // Use the connected wallet's public key
        "action": "buy",
        "mint": "4B8FK2HgQNakSjb3YUWbZSaQraLbi8zNezpRfKoqpump",
        "denominatedInSol": "false",
        "amount": 100,
        "slippage": 10,
        "priorityFee": 0.00001,
        "pool": "pump"
      })
    });

    if (response.status === 200) {
      const data = await response.arrayBuffer();
      const tx = VersionedTransaction.deserialize(new Uint8Array(data));
      const signature = await sendTransaction(tx, web3Connection);
      console.log("Transaction: https://solscan.io/tx/" + signature);
    } else {
      console.log(response.statusText); // log error
    }
  }

  async function sendCreateTx() {

    // Generate a random keypair for token
    const mintKeypair = Keypair.generate();

    // Define token metadata
    const formData = new FormData();
    formData.append("file", await fs.openAsBlob("./example.png")), // Image file
      formData.append("name", "PPTest"),
      formData.append("symbol", "TEST"),
      formData.append("description", "This is an example token created via PumpPortal.fun"),
      formData.append("twitter", "https://x.com/a1lon9/status/1812970586420994083"),
      formData.append("telegram", "https://x.com/a1lon9/status/1812970586420994083"),
      formData.append("website", "https://pumpportal.fun"),
      formData.append("showName", "true");

    // Create IPFS metadata storage
    const metadataResponse = await fetch("https://pump.fun/api/ipfs", {
      method: "POST",
      body: formData,
    });
    const metadataResponseJSON = await metadataResponse.json();

    // Send the create transaction
    const response = await fetch(`https://pumpportal.fun/api/trade?api-key=your-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "action": "create",
        "tokenMetadata": {
          name: metadataResponseJSON.metadata.name,
          symbol: metadataResponseJSON.metadata.symbol,
          uri: metadataResponseJSON.metadataUri
        },
        "mint": bs58.encode(mintKeypair.secretKey),
        "denominatedInSol": "true",
        "amount": 1, // Dev buy of 1 SOL
        "slippage": 10,
        "priorityFee": 0.0005,
        "pool": "pump"
      })
    });
    if (response.status === 200) { // successfully generated transaction
      const data = await response.json();
      console.log("Transaction: https://solscan.io/tx/" + data.signature);
    } else {
      console.log(response.statusText); // log error
    }
  }

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection, balance]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded" >
        <WalletMultiButton style={{}} />

        <p>Balance is ${balance}</p>
        <button onClick={sendPortalTransaction}>Portal Transaction</button>
      </div>
    </main>
  );
};

export default page;