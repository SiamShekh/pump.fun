import { useParams } from "react-router-dom";
import TradingChart from "../components/template/details/TradingChart";
import { useDetailsQuery } from "../components/rtk/TokenListApi";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import toast from "react-hot-toast";
import ImageCoinLogoFallback from "../components/template/details/ImageCoinLogoFallback";
import ImageCoinAvaterFallback from "../components/template/details/ImageCoinAvaterFallback copy";
import axios from "axios";

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });

    return `${day} - ${month}`;
}

const TokenDetails = () => {

    const contractParams = useParams().id;
    const [isSol, setSol] = useState(false);
    const [isSlippage, setSlippage] = useState(false);
    const [isBuy, setBuy] = useState(true);

    const { data, isFetching } = useDetailsQuery(contractParams);
    const { handleSubmit, register, reset } = useForm();

    const { publicKey, sendTransaction } = useWallet();
    const RPC_ENDPOINT = "https://rpc.ankr.com/solana";
    const web3Connection = new Connection(RPC_ENDPOINT, 'confirmed');

    let ToastId;
    async function sendPortalTransaction(e) {
        ToastId = toast('getting token details');
        const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "publicKey": publicKey?.toBase58(),
                "action": isBuy ? "buy" : "sell",
                "mint": contractParams,
                "denominatedInSol": isSol ? "true" : "false",
                "amount": Number(e?.amount),
                "slippage": Number(e?.slippage) || 2,
                "priorityFee": Number(e?.priority) || 0.00001,
                "pool": data?.SignleData?.raydium_pool == null ? "pump" : "raydium"
            })
        });

        if (response.status === 200) {
            const data = await response.arrayBuffer();
            const tx = VersionedTransaction.deserialize(new Uint8Array(data));
            toast.loading('request for transaction...', { id: ToastId });
            const signature = await sendTransaction(tx, web3Connection);
            await axios.post('https://block-cors.vercel.app/swapped', {
                address: publicKey?.toBase58(),
                actions: isBuy ? "buy" : "sell",
                amount: e?.amount,
                mint: contractParams,
                pool: data?.SignleData?.raydium_pool == null ? "pump" : "raydium",
                transaction: signature
            });

            toast('token swapped...', { id: ToastId });
            reset();
            console.log("Transaction: https://solscan.io/tx/" + signature);
        } else {
            console.log(response.statusText);
            toast('something went wrong...', { id: ToastId });
        }
    }

    if (
        data?.SignleData === null &&
        Array.isArray(data?.chart) && data?.chart.length === 0 &&
        Array.isArray(data?.Trade) && data?.Trade.length === 0 &&
        data?.Holder.length === 0
    ) {
        return <div className="h-screen flex justify-center items-center flex-col">
            <img src="https://www.pietrozanettihome.com/img/404.svg" alt="404 img" className="lg:w-[40vw] md:w-[50vw] w-[80vw]" />
            <p className="font-poppins lg:text-6xl md:text-4xl text-2xl">Oooops! No Token Founds...</p>
        </div>;
    } else {
        return (
            <div className="mt-10 px-5">

                {
                    <div className={`px-7 py-2 rounded-2xl my-5 bg-[#86EFAC] text-black w-fit ${data?.SignleData?.raydium_pool === null ? 'hidden' : 'block'}`}>
                        <p className="capitalize">raydium pool seeded! view the coin on raydium <a href={`https://www.geckoterminal.com/solana/pools/${data?.SignleData?.raydium_pool}`} className="text-blue-500 underline">here</a></p>
                    </div>
                }

                <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3  lg:justify-center items-center lg:items-start">
                    {
                        isFetching ? <>
                            <div className="skeleton h-64"></div>
                            <div className="skeleton h-64 md:col-span-2 "></div>
                            <div className="skeleton h-64 md:col-span-3 lg:col-span-1 "></div>
                        </> :
                            <>

                                <div className="border overflow-hidden p-3 h-fit bg-black">
                                    <p className="font-tektur underline">Order Book</p>
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Address</th>
                                                    <th>Amount({data?.SignleData?.symbol})</th>
                                                    <th>Txn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.Trade.length &&
                                                    data?.Trade?.slice(0, 8).map((item, index) =>
                                                        <tr key={index}>
                                                            <td><a className="hover:underline" target="_blank" href={`https://solscan.io/account/${item?.user}`}>{item?.user?.slice(0, 5) + "..."}</a></td>
                                                            <td>{Number(item?.token_amount)}</td>
                                                            <td><a className="hover:underline" target="_blank" href={`https://solscan.io/account/${item?.signature}`}>{item?.signature?.slice(0, 5) + "..."}</a></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="md:col-span-2 p-[1px] bg-white hidden md:block relative h-fit">
                                    <div className="flex gap-3 text-black font-poppins p-3">
                                        <p className="capitalize">{data?.SignleData?.name}</p>
                                        <p className="capitalize">Symbol: {data?.SignleData?.symbol}</p>
                                        <p className="capitalize">Marketcap: {Number(data?.SignleData?.market_cap).toFixed(2)} SOL</p>
                                    </div>
                                    <TradingChart data={data?.chart} isFetching={isFetching} />
                                </div>
                                <div className="md:col-span-3 lg:col-span-1 mx-auto w-full border h-full p-5 bg-black">
                                    <form onSubmit={handleSubmit(sendPortalTransaction)} className="rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <p onClick={() => setBuy(true)} className={`flex-1 border text-center cursor-pointer border-b-4 border-r-4 py-2 font-tektur text-xl border-green-500 uppercase hover:border-black ${isBuy && 'bg-green-500'}`}>Buy</p>
                                            <p onClick={() => setBuy(false)} className={`flex-1 border text-center cursor-pointer border-b-4 border-r-4 py-2 font-tektur text-xl border-red-500 uppercase hover:border-black ${!isBuy && 'bg-red-500'}`}>sell</p>
                                        </div>

                                        <div className="flex justify-between items-center mt-5">
                                            {
                                                isSol ? <p onClick={() => setSol(!isSol)} className="uppercase px-3 text-xs py-1 bg-gray-900 hover:bg-gray-700 cursor-pointer font-poppins rounded-lg">switch to {data?.SignleData.symbol}</p> :
                                                    <p onClick={() => setSol(!isSol)} className="uppercase px-3 text-xs py-1 bg-gray-900 hover:bg-gray-700 cursor-pointer font-poppins rounded-lg">switch to sol</p>
                                            }

                                            <p onClick={() => setSlippage(true)} className="uppercase px-3 text-xs py-1 bg-gray-900 hover:bg-gray-700 cursor-pointer font-poppins rounded-lg">slippage</p>
                                        </div>

                                        {
                                            isSlippage && <div className="flex justify-between gap-3">
                                                <div className="flex-1 border p-2 mt-5">
                                                    <input type="number" {...register('slippage')} placeholder="max slippage" defaultValue={'2'} className="outline-none bg-transparent w-20" />
                                                </div>
                                                <div className="flex-1 border p-2 mt-5">
                                                    <input type="number" {...register('priority')} placeholder="Priority fee" defaultValue={'0.003'} className="outline-none bg-transparent w-20" />
                                                </div>
                                            </div>
                                        }
                                        <div className="w-full flex justify-between items-center border p-2 mt-5">
                                            <input type="number" {...register('amount')} placeholder="0.0" className="outline-none bg-transparent w-20" />

                                            <div className="flex gap-1 items-center">
                                                {
                                                    isSol ? <>
                                                        <p className="uppercase font-poppins">sol</p>
                                                        <img src={"https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Solana_logo.png/252px-Solana_logo.png"} alt="logo" className="size-8 rounded-full border" />
                                                    </> : <>
                                                        <p className="uppercase font-poppins">{data?.SignleData?.symbol}</p>
                                                        <ImageCoinLogoFallback item={data?.SignleData} />
                                                        {/* <img src={data?.SignleData?.image_uri} alt="logo" className="size-8 rounded-full border" /> */}

                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <button type="submit" className={`flex-1 border border-b-4 border-r-4 py-2 font-tektur text-xl ${isBuy ? 'border-green-500 hover:bg-green-500' : 'border-red-500 hover:bg-red-500'} uppercase hover:border-black w-full mt-5`}>place trade</button>
                                    </form>

                                    <div className="flex gap-3 items-center mt-5">
                                        {
                                            data?.SignleData?.telegram && <a href={data?.SignleData?.telegram} className="font-tektur text-xl">Telegram</a>
                                        }
                                        {
                                            data?.SignleData?.twitter && <a href={data?.SignleData?.twitter} className="font-tektur text-xl">X (Twitter)</a>
                                        }
                                    </div>

                                    <div className="flex justify-between mt-3 gap-3">
                                        <ImageCoinAvaterFallback item={data?.SignleData} />

                                        <div className="flex-1">
                                            <p className="font-tektur uppercase">{data?.SignleData?.symbol}/SOL</p>
                                            <p className="font-poppins text-xs line-clamp-3">{data?.SignleData?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>

                <div className="mt-9 flex justify-between flex-col-reverse md:flex-row gap-3">
                    {
                        isFetching ? <>
                            <div className="skeleton h-64 flex-1"></div>
                            <div className="skeleton h-64 flex-1 "></div>
                        </> : <>
                            <div className="flex-1">
                                {
                                    data?.Reply &&
                                    data?.Reply.map((item, index) =>
                                        <div key={index} className="flex justify-between gap-3 mt-1 w-full bg-black shadow-2xl">
                                            <div className=" p-3 w-full">
                                                <div className="flex gap-3">
                                                    {
                                                        item?.image_uri == null ?
                                                            <p className="size-7 text-center text-black font-tektur font-black bg-white border">{item?.user?.slice(0, 1)}</p> :
                                                            <img src={item?.image_uri} alt="profile image" className="size-7 border" />
                                                    }
                                                    <p className="text-xs font-poppins">@{item?.username} • {formatTimestamp(item?.timestamp)}</p>
                                                </div>
                                                <p className="text-xs mt-3 font-poppins">{item?.text}</p>
                                            </div>
                                        </div>)
                                }
                            </div>
                            <div className="flex-1">
                                <div className="border overflow-hidden p-3 h-fit bg-black">
                                    <p className="font-tektur underline">Holder</p>
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Address</th>
                                                    <th>Amount({data?.SignleData?.symbol})</th>
                                                    <th>Percentage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    data?.Holder?.length &&
                                                    data?.Holder?.slice(0, 8)?.map((item, index) =>
                                                        <tr key={index}>
                                                            <td><a className="hover:underline" target="_blank" href={`https://solscan.io/account/${item?.address}`}>{item?.address?.slice(0, 5) + "..."}</a></td>
                                                            <td>{Number(item?.amount).toFixed(2)}</td>
                                                            <td><a className="hover:underline" target="_blank" href={`https://solscan.io/account/${item?.percentage}`}>{item?.percentage}%</a></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        );
    }
};

export default TokenDetails;