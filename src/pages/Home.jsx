import { useState } from "react";
import hero_image from "../assets/image/dog-look-at-me.webp";
import ForYou from "../components/template/home/ForYou";
import NewToken from "../components/template/home/NewToken";
import Populer from "../components/template/home/Populer";
import TopGainer from "../components/template/home/TopGainer";
import { useHomeInformissionQuery } from "../components/rtk/TokenListApi";
const Home = () => {
    const [searchTrem, setSearchTrem] = useState("");
    const { data, isFetching } = useHomeInformissionQuery(undefined);

    return (
        <div>
            <section className="relative h-[50vh]">
                <div className="absolute z-0 w-full">
                    <img src={hero_image} alt="" className="w-full object-cover h-[50vh] relative z-0" />
                    <div className="bg-gradient-to-b from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                    <div className="bg-gradient-to-r from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                    <div className="bg-gradient-to-l from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                    <div className="bg-gradient-to-t from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                </div>
                <div className="relative z-10 h-full w-full flex justify-center items-center">
                    <div className="">
                        <p className="font-tektur md:text-5xl text-3xl font-bold mb-5">Search by Contract <span className="block bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">Address & Symbol</span></p>
                        <div className="border border-b-4 border-r-4 px-7 py-3 w-full flex justify-between" >
                            <input type="text" placeholder="search by contract address" className="bg-transparent font-tektur outline-none " />
                            <div className="btn rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <p className="font-tektur text-2xl font-bold text-white">Markets</p>
                <div className="grid grid-cols-3 gap-5 mt-2">
                    {
                        isFetching ? <>
                            <div className="skeleton w-full h-52"></div>
                            <div className="skeleton w-full h-52"></div>
                            <div className="skeleton w-full h-52"></div>
                        </> :
                            <>
                                <NewToken data={data?.New} />

                                <TopGainer data={data?.TopGainers} />

                                <Populer data={data?.Popular} />
                            </>
                    }

                </div>
            </section>

            <section className="mt-5">
                {
                    isFetching ? <>
                        <div className="skeleton w-full h-[80vh]"></div>
                    </> :
                        <>
                            <ForYou data={data?.List} />
                        </>
                }
            </section>
        </div>
    );
};

export default Home;