import ImageWithFallback from "./ImageFallbackHome";
import "../home/Text_Colors.css";

const Populer = ({ data }) => {
    return (
        <div>
            <div className="border border-white border-opacity-30 rounded-2xl px-5 py-2">
                <p className="font-tektur text-xl font-semibold">Popular</p>
                {
                    data?.slice(0, 4).map((item, index) =>
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item} />
                            <p className="text-start w-fit uppercase animated-text">{item?.symbol}/SOL</p>
                            <p>${Number(item?.usd_market_cap).toFixed(2)}</p>
                        </a>
                    )
                }
            </div>
        </div>
    );
};

export default Populer;