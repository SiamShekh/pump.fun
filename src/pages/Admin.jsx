import { useDashboardInfoQuery } from "../components/rtk/TokenListApi";

const Admin = () => {

    const { isFetching, data } = useDashboardInfoQuery(undefined);

    return (
        <div className="min-h-screen p-5">

            <div className={` grid lg:grid-cols-3 md:grid-cols-2 gap-3 mt-10`}>
                {
                    isFetching ? <>
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-64 w-full"></div>
                    </> :
                        <>
                            <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                                <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                    </svg>
                                </div>
                                <p className="font-tektur text-2xl font-bold">Virtual Wallets</p>
                                <p className="font-tektur text-8xl font-bold">{data?.virtual_wallets ? data?.virtual_wallets : 0}</p>
                            </div>

                            <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                                <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </div>
                                <p className="font-tektur text-2xl font-bold">Swapped</p>
                                <p className="font-tektur text-8xl font-bold">{data?.swapped ? data?.swapped : 0}</p>
                            </div>

                            <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                                <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                                <p className="font-tektur text-2xl font-bold">Token Created</p>
                                <p className="font-tektur text-8xl font-bold">{data?.token_created ? data?.token_created : 0}</p>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Admin;