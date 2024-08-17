import hero_image from "../assets/image/dog-look-at-me.webp";
import ForYou from "../components/template/home/ForYou";
import NewToken from "../components/template/home/NewToken";
import Populer from "../components/template/home/Populer";
import TopGainer from "../components/template/home/TopGainer";
const Home = () => {


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
                    <NewToken />

                    <TopGainer />

                    <Populer />
                </div>
            </section>

            <section className="mt-5">
                <ForYou />
            </section>
        </div>
    );
};

export default Home;