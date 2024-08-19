import { Link, useParams } from "react-router-dom";
import { useProfileQuery } from "../components/rtk/TokenListApi";
import pump from "../assets/image/pump.png";

const Profile = () => {
    const mint = useParams().mint;
    const { data, isFetching } = useProfileQuery(mint);

    const uniqueBalance = data?.balance?.filter((item, index, self) =>
        index === self.findIndex((t) => t.symbol === item.symbol)
    );


    return (
        <div className="min-h-screen mt-10 m-5">
            <div className="flex items-center gap-10 flex-col md:flex-row">
                <img src={pump} alt="profile logo" className="size-40" />
                <div className="">
                    <p className="text-2xl mb-10">Address: {mint.slice(0,12)+"..."}</p>
                    <Link to={`https://solscan.io/account/${mint}`} className="border border-b-4 border-r-4 px-8 py-3">View on Explorer</Link>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-3 mt-10">
                {
                    isFetching ?
                        <>
                            <div className="skeleton h-60"></div>
                            <div className="skeleton h-60"></div>
                        </> : <>

                            <div className="">
                                <p className="font-tektur text-xl md:text-3xl">Holding Balance</p>
                                {
                                    uniqueBalance?.map((item, index) =>
                                        <div key={index} className="border border-r-4 border-b-4 p-5 flex gap-5 items-center justify-between flex-col md:flex-row">
                                            <div className="flex gap-5 items-center">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 md:w-16">
                                                        <img src={item?.image_uri} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className="font-poppins md:text-2xl">{item?.name}</p>
                                                    <p className="font-poppins md:text-2xl">{item?.balance}</p>
                                                </div>
                                            </div>
                                            <Link to={`/details/${mint}`} className="border border-b-4 border-r-4 px-8 py-3 text-xs">View Coin</Link>

                                        </div>)
                                }
                            </div>
                            <div className="">
                                <p className="font-tektur  text-xl md:text-3xl">Created Coin</p>
                                {
                                    data?.created?.map((item, index) =>
                                        <div key={index} className="border border-r-4 border-b-4 p-5 flex gap-5 items-center justify-between flex-col md:flex-row">
                                            <div className="flex gap-5 items-center">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 md:w-16">
                                                        <img src={item?.image_uri} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className="font-poppins md:text-2xl">{item?.name}</p>
                                                    <p className="font-poppins">Marketcup: ${Number(item?.usd_market_cap).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <Link to={`/details/${mint}`} className="border border-b-4 border-r-4 px-8 py-3 text-xs">View Coin</Link>

                                        </div>)
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Profile;