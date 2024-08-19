import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, VersionedTransaction, SendTransactionError, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { useFindWalletsQuery } from '../components/rtk/TokenListApi';
import bs58 from 'bs58';
import transfer from "../assets/image/transfer_img.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CreateToken() {
    const { publicKey, sendTransaction } = useWallet();
    const RPC_ENDPOINT = "https://rpc.helius.xyz/?api-key=40c3ebe4-c797-45a3-895e-b3cc09a24bf3";
    const connection = new Connection(
        RPC_ENDPOINT,
        'confirmed',
    );
    const { register, handleSubmit } = useForm();
    const { data: VirtualWallets } = useFindWalletsQuery(publicKey?.toBase58());
    const [isModal, setModal] = useState(false);
    const [isTransaction, setTransaction] = useState("");
    const [isMint, setMint] = useState("");

    const handleForm = async (e) => {
        const form = new FormData();
        form.append("image", e.file[0]);

        //UPLOAD IMAGE TO IMGBB
        const ImageResponse = await fetch("https://api.imgbb.com/1/upload?key=8c774531db468728c2d324fd5ba6991d", {
            body: form,
            method: "POST",
        }).then(res => res.json());

        const ipfsObj = {
            name: "AMi lowya",
            file: ImageResponse?.data?.display_url,
            symbol: "LOWYA",
            description: "ghfbvhuvksb",
            showName: "true"
        }

        const meta_response = await axios.post('https://block-cors.vercel.app/ipfs', ipfsObj);

        const metadataResponseJSON = meta_response.data;
        const mintKeypair = Keypair.generate().secretKey;

        await SendSol();
        await CreateToken(metadataResponseJSON, mintKeypair);
        await SendBackExistingSol();
    }

    const SendSol = async () => {
        const latestBlockhash = await connection.getLatestBlockhash('finalized');

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(VirtualWallets?.virtualWallet?.walletPublicKey),
                lamports: 0.028 * 1e9,
            })
        );

        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;

        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'processed');
        console.log('Transaction sent with signature:', signature);
    }

    const CreateToken = async (metadataResponseJSON, mint) => {
        const response = await fetch(`https://pumpportal.fun/api/trade?api-key=${VirtualWallets?.virtualWallet?.apiKey}`, {
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
                "mint": bs58.encode(mint),
                "denominatedInSol": "false",
                "amount": 0, // Dev buy of 1 SOL
                "slippage": 10,
                "priorityFee": 0.0005,
                "pool": "pump"
            })
        });
        if (response.status === 200) {
            const data = await response.json();

            await getTransactionDetails(data.signature);

        } else {
            console.log(response.statusText);
        }
    }

    async function getTransactionDetails(txSignature) {
        try {
            const txDetails = await connection.getTransaction(txSignature, {
                commitment: "confirmed",
                maxSupportedTransactionVersion: 0
            });

            setTransaction(txSignature);
            setMint(txDetails?.meta?.postTokenBalances[0]?.mint);
            setModal(true);

            return txDetails?.meta?.postTokenBalances[0]?.mint;
        } catch (error) {
            console.error("Failed to get transaction:", error);
        }
    }

    const SendBackExistingSol = async () => {
        const privateKeyString = VirtualWallets?.virtualWallet?.privateKey;
        
        const privateKey = bs58.decode(privateKeyString);
        const keypair = Keypair.fromSecretKey(privateKey);
        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        const walletBalance = await connection.getBalance(keypair.publicKey);
        const lamportsToTransfer = walletBalance - 0.001 * 1e9;
        if (lamportsToTransfer > 0) {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: new PublicKey(publicKey?.toBase58()),
                    lamports: lamportsToTransfer,
                })
            );

            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = keypair.publicKey;
            transaction.sign(keypair);
            const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
            console.log('Transaction sent with signature:', signature);
        } else {
            console.log("Not enough SOL to cover transaction fees.");
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            {
                isModal &&
                <dialog id="my_modal_1" open className="modal">
                    <div className="modal-box border">
                        <img src={transfer} alt="transfer icon" className='w-40 mx-auto' />

                        <div className="flex gap-5 mt-5 justify-center items-center">
                            <Link to={`https://solscan.io/tx/${isTransaction}`} className='border px-5 py-2 border-b-4 border-r-4 font-tektur text-xl'>Solscan</Link>
                            <Link to={`/details/${isMint}`} className='border px-5 py-2 border-b-4 border-r-4 font-tektur text-xl' >Details</Link>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => setModal(false)}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            }

            <h1 onClick={SendBackExistingSol}>Create Your Token</h1>
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
