import { useParams } from "react-router-dom";
import TradingChart from "../components/template/details/TradingChart";
import { useDetailsQuery } from "../components/rtk/TokenListApi";
import { useState } from "react";

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

    return (
        <div className="mt-10 px-5">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3  lg:justify-center items-center lg:items-start">
                <div className="border border-b-4 border-r-4 p-3 h-fit">
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
                                    data?.Trade?.slice(0, 8).map((item, index) =>
                                        <tr key={index}>
                                            <td><a className="hover:underline" target="_blank" href={`https://solscan.io/account/${item?.user}`}>{item?.user?.slice(0, 5) + "..."}</a></td>
                                            <td>{Number(item?.token_amount).toString().slice(0, 10) + "..."}</td>
                                            <td><a className="hover:underline" target="_blank" href={`https://solscan.io/account/${item?.signature}`}>{item?.signature?.slice(0, 5) + "..."}</a></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:col-span-2 p-[1px] bg-white hidden lg:block relative h-fit">
                    <div className="flex gap-3 text-black font-poppins p-3">
                        <p className="capitalize">{data?.SignleData.name}</p>
                        <p className="capitalize">Symbol: {data?.SignleData.symbol}</p>
                        <p className="capitalize">Marketcup: {Number(data?.SignleData.market_cap).toFixed(2)} SOL</p>
                    </div>
                    <TradingChart data={data?.chart} isFetching={isFetching} />
                </div>
                <div className="md:col-span-3 lg:col-span-1 mx-auto w-full">
                    <div className="bg-[#10173d] p-5 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setBuy(true)} className={`flex-1 border border-b-4 border-r-4 py-2 font-tektur text-xl border-green-500 uppercase hover:border-black ${isBuy && 'bg-green-500'}`}>Buy</button>
                            <button onClick={() => setBuy(false)} className={`flex-1 border border-b-4 border-r-4 py-2 font-tektur text-xl border-red-500 uppercase hover:border-black ${!isBuy && 'bg-red-500'}`}>sell</button>
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
                                    <input type="number" placeholder="max slippage" defaultValue={'2'} className="outline-none bg-transparent w-20" />
                                </div>
                                <div className="flex-1 border p-2 mt-5">
                                    <input type="number" placeholder="Priority fee" defaultValue={'0.003'} className="outline-none bg-transparent w-20" />
                                </div>
                            </div>
                        }
                        <div className="w-full flex justify-between items-center border p-2 mt-5">
                            <input type="number" placeholder="0.0" className="outline-none bg-transparent w-20" />

                            <div className="flex gap-1 items-center">
                                {
                                    isSol ? <>
                                        <p className="uppercase font-poppins">sol</p>
                                        <img src={"https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Solana_logo.png/252px-Solana_logo.png"} alt="logo" className="size-8 rounded-full border" />
                                    </> : <>
                                        <p className="uppercase font-poppins">{data?.SignleData?.symbol}</p>
                                        <img src={data?.SignleData?.profile_image} alt="logo" className="size-8 rounded-full border" />
                                    </>
                                }
                            </div>
                        </div>

                        <button className={`flex-1 border border-b-4 border-r-4 py-2 font-tektur text-xl ${isBuy ? 'border-green-500 hover:bg-green-500' : 'border-red-500 hover:bg-red-500'} uppercase hover:border-black w-full mt-5`}>place trade</button>
                    </div>

                    <div className="flex gap-3 items-center mt-5">
                        {
                            data?.SignleData?.telegram && <a href={data?.SignleData?.telegram} className="font-tektur text-xl">Telegram</a>
                        }
                        {
                            data?.SignleData?.twitter && <a href={data?.SignleData?.twitter} className="font-tektur text-xl">X (Twitter)</a>
                        }
                    </div>

                    <div className="flex justify-between mt-3 gap-3">
                        <img src={data?.SignleData?.profile_image} alt="" className="size-16" />
                        <div className="flex-1">
                            <p className="font-tektur uppercase">{data?.SignleData?.symbol}/SOL</p>
                            <p className="font-poppins text-xs line-clamp-3">{data?.SignleData?.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-9">
                {
                    data?.Reply.map((item, index) =>
                        <div key={index} className="flex justify-between gap-3 mt-1 w-full">
                            <div className="bg-gray-700 p-3 w-full">
                                <div className="flex gap-3">
                                    {
                                        item?.profile_image == null ? 
                                        <p className="size-7 text-center text-black font-tektur font-black bg-white border">{item?.user?.slice(0,1)}</p> : 
                                        <img src={item?.profile_image} alt="profile image" className="size-7 border" />
                                    }
                                    <p className="text-xs font-poppins">@{item?.username} • {formatTimestamp(item?.timestamp)}</p>
                                </div>
                                <p className="text-xs mt-3 font-poppins">{item?.text}</p>
                            </div>
                        </div>)
                }
            </div>

        </div>
    );
};

export default TokenDetails;