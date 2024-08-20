import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { useFindWalletsQuery } from '../components/rtk/TokenListApi';
import bs58 from 'bs58';
import transfer from "../assets/image/transfer_img.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateToken() {
    const { publicKey, sendTransaction } = useWallet();
    const RPC_ENDPOINT = "https://rpc.helius.xyz/?api-key=40c3ebe4-c797-45a3-895e-b3cc09a24bf3";
    const connection = new Connection(
        RPC_ENDPOINT,
        'confirmed',
    );
    const { register, handleSubmit, reset } = useForm();
    const { data: VirtualWallets } = useFindWalletsQuery(publicKey?.toBase58());
    const [isModal, setModal] = useState(false);
    const [isTransaction, setTransaction] = useState("");
    const [isMint, setMint] = useState("");

    let ToastId;

    const handleForm = async (e) => {
        try {
            const form = new FormData();
            form.append("image", e.file[0]);

            //UPLOAD IMAGE TO IMGBB
            ToastId = toast('Iconing Uploading');
            const ImageResponse = await fetch("https://api.imgbb.com/1/upload?key=8c774531db468728c2d324fd5ba6991d", {
                body: form,
                method: "POST",
            }).then(res => res.json());

            const ipfsObj = {
                name: e?.name,
                file: ImageResponse?.data?.display_url,
                symbol: e?.symbol,
                description: e?.description,
                twitter: e?.twitter,
                telegram: e?.telegram,
                website: e?.website,
                showName: "true"
            }
            toast.loading('Meta Uri Genarating...', { id: ToastId });
            const meta_response = await axios.post('https://block-cors.vercel.app/ipfs', ipfsObj);

            const metadataResponseJSON = meta_response.data;
            const mintKeypair = Keypair.generate();

            await SendSol();
            await CreateToken(metadataResponseJSON, mintKeypair.secretKey, mintKeypair?.publicKey);

        } catch (error) {
            toast.error('some thing went wrong...', { id: ToastId });
        }
    }

    const SendSol = async () => {
        toast.loading('Geting Blockhash...', { id: ToastId });
        const latestBlockhash = await connection.getLatestBlockhash('finalized');

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(VirtualWallets?.virtualWallet?.walletPublicKey),
                lamports: 0.056 * 1e9,
            })
        );

        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;

        toast.loading('Request For Transaction...', { id: ToastId });
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'processed');
    }

    const CreateToken = async (metadataResponseJSON, mint, pub) => {
        toast.loading('Request For Creating Token...', { id: ToastId });
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
            toast.success('Token Created...', { id: ToastId });
            await setMint(pub);
            await setTransaction(data.signature);
            await setModal(true);

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
                    toPubkey: new PublicKey("4afoCAR8gX5oKv2NAbfbpGW6kCUAwigTmQpwyVdsukM7"),
                    lamports: lamportsToTransfer,
                })
            );

            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = keypair.publicKey;
            transaction.sign(keypair);
            await sendAndConfirmTransaction(connection, transaction, [keypair]);
        }
    }


    return (
        <div className='min-h-screen mt-10 mx-auto w-full px-5'>
            {
                isModal &&
                <dialog id="my_modal_1" open className="modal">
                    <div className="modal-box border">
                        <img src={transfer} alt="transfer icon" className='w-40 mx-auto' />

                        <div className="flex gap-5 mt-5 justify-center items-center">
                            <Link onClick={() => {
                                SendBackExistingSol();
                                reset();
                            }} to={`https://solscan.io/tx/${isTransaction}`} target='_blank' className='border px-5 py-2 border-b-4 border-r-4 font-tektur text-xl'>Solscan</Link>
                            <Link onClick={() => {
                                SendBackExistingSol();
                                reset();
                            }} to={`/details/${isMint}`} target='_blank' className='border px-5 py-2 border-b-4 border-r-4 font-tektur text-xl' >Details</Link>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => {
                                    SendBackExistingSol();
                                    setModal(false);
                                    reset();
                                }}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            }

            <h1 className='font-tektur text-2xl text-center'>Create Your Token</h1>
            <form onSubmit={handleSubmit(handleForm)} className='mt-5 '>
                <div className="grid md:grid-cols-2 gap-5 justify-center items-center">
                    <div className="">
                        <input placeholder='coin name' {...register('name', { required: true })} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins' />
                    </div>
                    <div className="">
                        <input placeholder='coin symbol' {...register('symbol', { required: true })} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins' />
                    </div>

                    <div className="col-span-2">
                        <textarea placeholder='coin description' {...register('description', { required: true })} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins ' />
                    </div>

                    <div className="">
                        <input placeholder='coin logo' type='file' {...register('file', { required: true })} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins' />
                    </div>

                    <div className="">
                        <input placeholder='coin website (optional)' {...register('website')} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins' />
                    </div>

                    <div className="">
                        <input placeholder='coin x(twitter) - (optional)' {...register('twitter')} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins' />
                    </div>
                    <div className="">
                        <input placeholder='coin telegram (optional)' {...register('telegram')} className='text-white px-5 py-3 bg-black outline-none border w-64 md:w-full font-poppins' />
                    </div>
                </div>
                <p>Tip: coin data cannot be changed after creation</p>

                <button className='bg-white text-black px-8 py-2 mt-5 font-poppins font-semibold' type="submit">Create Token</button>
            </form>
        </div>
    );
}
