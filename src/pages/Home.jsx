import { useEffect, useState } from "react";
import hero_image from "../assets/image/dog-look-at-me.webp";
import ForYou from "../components/template/home/ForYou";
import NewToken from "../components/template/home/NewToken";
import Populer from "../components/template/home/Populer";
import TopGainer from "../components/template/home/TopGainer";
import { useHomeInformissionQuery } from "../components/rtk/TokenListApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LastTradeCoin from "../components/template/home/LastTradeCoin";
import LastReplyCoin from "../components/template/home/LastReplyCoin";

const Home = () => {
    const { data, isFetching } = useHomeInformissionQuery(undefined);
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const HandleSearch = e => {
        navigate(`/details/${e.search}`)
    }




    return (
        <div>
            <section className="relative lg:h-[70vh] h-[50vh] my-10">
                <div className="absolute z-0 w-full">
                    <img src={hero_image} alt="" className="w-full object-cover h-[50vh] relative z-0" />
                    <div className="bg-gradient-to-b from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                    <div className="bg-gradient-to-r from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                    <div className="bg-gradient-to-l from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                    <div className="bg-gradient-to-t from-transparent to-[#1A103D] w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></div>
                </div>
                <div className="relative z-10 h-full w-full flex lg:grid gap-5 grid-cols-4 justify-center items-center ">
                    <div className="">
                        <LastTradeCoin />
                    </div>
                    <div className="col-span-2">
                        <p className="px-5 font-tektur md:text-5xl text-2xl  md:px-0 font-bold mb-5">Search by Contract </p>
                        <form onSubmit={handleSubmit(HandleSearch)} className="border rounded-2xl px-7 py-3 w-full flex justify-between" >
                            <input type="text" {...register('search')} placeholder="search" className="bg-transparent lg:w-fit w-[60vw] font-tektur outline-none " />

                            <button type="submit" className="md:btn md:rounded-full">
                                <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="">
                        <LastReplyCoin/>
                    </div>

                </div>
            </section>

            <section className="mx-5">
                <p className="font-tektur text-2xl font-bold text-white">Markets</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
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

            <section className="mt-5 mx-5">
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