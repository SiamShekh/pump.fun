import hero_image from "../assets/image/dog-look-at-me.webp";
import { useTopQuery } from "../components/rtk/TokenListApi";
const Home = () => {
    const { data } = useTopQuery(undefined);
    console.log(data);

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
                        <input type="text" placeholder="search" className="bg-transparent font-tektur outline-none border border-b-4 border-r-4 px-7 py-3 w-full" />
                    </div>
                </div>
            </section>

            <section>
                <p className="font-tektur text-2xl font-bold text-white">Markets</p>

                <div className="grid grid-cols-3 gap-5 mt-2">
                    <div className="border border-b-4 border-r-4 px-5 py-2">
                        <p className="font-tektur text-xl font-semibold">New</p>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                    </div>

                    <div className="border border-b-4 px-5 py-2">
                        <p className="font-tektur text-xl font-semibold">Top Gainers</p>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                    </div>

                    <div className="border border-b-4 border-l-4 px-5 py-2">
                        <p className="font-tektur text-xl font-semibold">Popular</p>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                        <div className="flex justify-between gap-3 my-2">
                            <img src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75" alt="" />
                            <p>MX/SOL</p>
                            <p>$0.902</p>
                            <p>890$</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-5">
                <div className="border border-b-4 border-r-4 px-5 py-2">
                    <p className="font-tektur text-xl font-semibold">For you</p>

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Marketcap</th>
                                    <th>Creator</th>
                                    <th>Created time</th>
                                    <th>Last trade</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="font-tektur">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">STROM</div>
                                                <div className="text-sm opacity-50">PartnerStrom</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$0.257</td>
                                    <td>$8947</td>
                                    <td>@username</td>
                                    <td>10:90 AM - 17 July</td>
                                    <td>02:20 AM</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">trade</button>
                                    </th>
                                </tr>
                                <tr className="font-tektur">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">STROM</div>
                                                <div className="text-sm opacity-50">PartnerStrom</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$0.257</td>
                                    <td>$8947</td>
                                    <td>@username</td>
                                    <td>10:90 AM - 17 July</td>
                                    <td>02:20 AM</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">trade</button>
                                    </th>
                                </tr>
                                <tr className="font-tektur">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">STROM</div>
                                                <div className="text-sm opacity-50">PartnerStrom</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$0.257</td>
                                    <td>$8947</td>
                                    <td>@username</td>
                                    <td>10:90 AM - 17 July</td>
                                    <td>02:20 AM</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">trade</button>
                                    </th>
                                </tr>
                                <tr className="font-tektur">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">STROM</div>
                                                <div className="text-sm opacity-50">PartnerStrom</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$0.257</td>
                                    <td>$8947</td>
                                    <td>@username</td>
                                    <td>10:90 AM - 17 July</td>
                                    <td>02:20 AM</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">trade</button>
                                    </th>
                                </tr>
                                <tr className="font-tektur">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fmax.png&w=32&q=75"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">STROM</div>
                                                <div className="text-sm opacity-50">PartnerStrom</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$0.257</td>
                                    <td>$8947</td>
                                    <td>@username</td>
                                    <td>10:90 AM - 17 July</td>
                                    <td>02:20 AM</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">trade</button>
                                    </th>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Home;