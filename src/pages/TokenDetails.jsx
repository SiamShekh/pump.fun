import { useParams } from "react-router-dom";
import TradingChart from "../components/template/details/TradingChart";

const TokenDetails = () => {
    const contractParams = useParams().id;


    return (
        <div className="mt-10">
            <div className="flex justify-between gap-10">
                <div className="flex-[2] rounded-2xl p-3 bg-[#10173d] relative">
                    <TradingChart contract={contractParams} />
                </div>
                <div className="flex-1">
                    <div className="bg-[#10173d] p-5 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <button className="flex-1 border border-b-4 border-r-4 py-2 font-tektur text-xl border-green-500 uppercase hover:bg-green-500 hover:border-black">Buy</button>
                            <button className="flex-1 border border-b-4 border-r-4 py-2 font-tektur text-xl border-red-500 uppercase hover:bg-red-500 hover:border-black ">sell</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TokenDetails;