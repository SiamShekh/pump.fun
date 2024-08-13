"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [balance, setBalance] = useState(0);
  const { publicKey, sendTransaction } = useWallet();
  const RPC_ENDPOINT = "https://rpc.ankr.com/solana";
  const web3Connection = new Connection(RPC_ENDPOINT, 'confirmed');

  const { connection } = useConnection();
  // useEffect(() => {
  //   if (publicKey) {
  //     (async function getBalance() {
  //       const newBalance = await connection.getBalance(publicKey);
  //       setBalance(newBalance);
  //       setTimeout(getBalance, 100000)
  //     })
  //   }
  // }, [publicKey, connection, balance]);

  async function sendPortalTransaction() {
    const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "publicKey": publicKey?.toBase58(),  // Use the connected wallet's public key
        "action": "buy",
        "mint": "Hq5sNybSDca7p211wdMzkqeN7PGa4QwDq8uUxb1vpump",
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
    <div>
      <div className="border hover:border-slate-900 rounded">
        <p>Balance is ${balance}</p>
        <WalletMultiButton style={{}} />
        <button onClick={sendPortalTransaction}>Portal Transaction</button>
      </div>
    </div>
  );
};

export default page;