
const Populer = ({data}) => {
    return (
        <div>
            <div className="border border-b-4 px-5 py-2">
                <p className="font-tektur text-xl font-semibold">Top Gainers</p>
                {
                    data?.slice(0, 4).map((item, index) =>
                        <div key={index} className="flex justify-between gap-3 my-2 ">
                            <img src={`${item?.image_uri}?url=%2Fcoins%2Fmax.png&w=32&q=75`} alt="" className="size-7 rounded-full" />
                            <p className="text-start w-fit uppercase">{item?.symbol}/SOL</p>
                            <p>${Number(item?.usd_market_cap).toFixed(2)}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Populer;