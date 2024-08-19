import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const Profile = () => {
    const { publicKey, sendTransaction } = useWallet();
    const RPC_ENDPOINT = "https://rpc.helius.xyz/?api-key=40c3ebe4-c797-45a3-895e-b3cc09a24bf3";

    const connection = new Connection(RPC_ENDPOINT, 'confirmed');

    const sendSol = async () => {
        if (!publicKey) {
            alert('Please connect your wallet first.');
            return;
        }

        const recipientAddress = '7p5tiBiLsE5qEHjoJ2ffBvbuYqCuWZCazwsSmwFojV9X';
        const amount = 0.001;

        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recipientAddress),
                    lamports: amount * 1e9, // Convert SOL to lamports
                })
            );

            const latestBlockhash = await connection.getLatestBlockhash('finalized');
            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = publicKey;

            // Sign the transaction with the connected wallet
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

export default Profile;
