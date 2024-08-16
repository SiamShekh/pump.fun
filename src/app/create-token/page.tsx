"use client";

import React, { useState } from 'react';
import { VersionedTransaction, Connection, Keypair, clusterApiUrl, Transaction, SystemProgram, PublicKey, SendTransactionError } from '@solana/web3.js';
import bs58 from "bs58";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import WalletCreation from '@/components/api/WalletCreation';
export default function CreateToken() {
    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const RPC_ENDPOINT = "https://rpc.ankr.com/solana";
    // const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
    const web3Connection = new Connection(
        RPC_ENDPOINT,
        'confirmed',
    );

    const { connection } = useConnection();

    const { register, handleSubmit } = useForm();

    // const handleForm = async (e) => {
    //     const form = new FormData();
    //     form.append("image", e.file[0]);

    //     const ImageResponse = await fetch("https://api.imgbb.com/1/upload?key=8c774531db468728c2d324fd5ba6991d", {
    //         body: form,
    //         method: "POST",
    //     }).then(res => res.json());

    //     const formData = new FormData();
    //     formData.append("name", "Lafti");
    //     formData.append("file", ImageResponse?.data?.display_url);
    //     formData.append("symbol", "kio");
    //     formData.append("description", "not for nall");
    //     formData.append("twitter", "");
    //     formData.append("telegram", "");
    //     formData.append("website", "");
    //     formData.append("showName", "true");

    //     const response = await axios.post('https://block-cors.vercel.app/', formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryizEA8suQ9RDCXWsW"
    //         }
    //     });

    //     const metadataResponseJSON = response.data;

    //     const mintKeypair = Keypair.generate();


    //     console.log(mintKeypair);
    //     console.log(metadataResponseJSON);

    //     const CreationResponse = await fetch(`https://pumpportal.fun/api/trade-local`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "publicKey": publicKey?.toBase58(),
    //             "action": "create",
    //             "tokenMetadata": {
    //                 name: metadataResponseJSON.metadata.name,
    //                 symbol: metadataResponseJSON.metadata.symbol,
    //                 uri: metadataResponseJSON.metadataUri
    //             },
    //             "mint": mintKeypair.publicKey.toBase58(),
    //             "denominatedInSol": "false",
    //             "amount": 0, // dev buy of 1 SOL
    //             "slippage": 10,
    //             "priorityFee": 0.0005,
    //             "pool": "pump"
    //         })
    //     });
    //     if (CreationResponse.status === 200) { // successfully generated transaction
    //         const data = await CreationResponse.arrayBuffer();
    //         const tx = VersionedTransaction.deserialize(new Uint8Array(data));
    //         const sign = await signTransaction(tx);
    //         const signature = await connection.sendTransaction(sign);
    //         console.log("Transaction: https://solscan.io/tx/" + signature);
    //     } else {
    //         console.log(CreationResponse.statusText); // log error
    //     }
    // }

    async function sendLocalCreateTx(e) {
        e.preventDefault();

    }

    // const sendSol = async () => {
    //     if (!publicKey) {
    //         alert('Please connect your wallet first.');
    //         return;
    //     }

    //     const recipientAddress = '7p5tiBiLsE5qEHjoJ2ffBvbuYqCuWZCazwsSmwFojV9X'; // Replace with the actual recipient address
    //     const amount = 0.1; // Amount of SOL to send

    //     try {
    //         // Get a recent blockhash
    //         const { blockhash } = await connection.getLatestBlockhash();

    //         // Create a new transaction
    //         const transaction = new Transaction({
    //             recentBlockhash: blockhash,
    //             feePayer: publicKey,
    //         }).add(
    //             SystemProgram.transfer({
    //                 fromPubkey: publicKey,
    //                 toPubkey: new PublicKey(recipientAddress),
    //                 lamports: amount * 1e9, // Convert SOL to lamports
    //             })
    //         );

    //         // Send the transaction
    //         const signature = await sendTransaction(transaction, connection);
    //         await connection.confirmTransaction(signature, 'processed');

    //         console.log('Transaction sent with signature:', signature);
    //         alert(`Transaction sent with signature: ${signature}`);
    //     } catch (error) {
    //         console.error('Transaction failed:', error);
    //         alert(`Transaction failed: ${error.message}`);
    //     }
    // };

    return (
        <div>
            <h1>Create Your Token</h1>
            <form onSubmit={handleSubmit(handleForm)}>
                <div>
                    <label>Token Image: </label>
                    <input className='bg-black text-white' type="file" {...register("file")} required />
                </div>
                <button type="submit">Create Token</button>
            </form>
        </div>
    );
}
