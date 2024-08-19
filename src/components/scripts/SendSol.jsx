import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const SendSol = () => {
    const { publicKey, sendTransaction } = useWallet();
    const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"; // Solana's public mainnet endpoint
    const connection = new Connection(RPC_ENDPOINT, 'confirmed');

    const sendSol = async () => {
        if (!publicKey) {
            alert('Please connect your wallet first.');
            return;
        }

        const recipientAddress = '7p5tiBiLsE5qEHjoJ2ffBvbuYqCuWZCazwsSmwFojV9X';
        const amount = 0.001;

        try {
            const latestBlockhash = await connection.getLatestBlockhash('finalized');
            console.log('Fetched Blockhash:', latestBlockhash);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recipientAddress),
                    lamports: amount * 1e9, // Convert SOL to lamports
                })
            );

            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = publicKey;

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');

            console.log('Transaction sent with signature:', signature);
            alert(`Transaction sent with signature: ${signature}`);
        } catch (error) {
            console.error('Transaction failed:', error);
            alert(`Transaction failed: ${error.message}`);
        }
    };

    return (
        <div>
            <button onClick={sendSol}>Send 0.001 SOL</button>
        </div>
    );
};

export default SendSol;
