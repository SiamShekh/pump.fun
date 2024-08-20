import { useEffect, useState } from "react";
import ImageWithFallback from "./ImageFallbackHome";

const NewToken = ({ data }) => {
    const [realTime, setRealTime] = useState([]);
    const [animate, setAnimate] = useState(false); // State to control animation

    useEffect(() => {
        const ws = new WebSocket('wss://pumpportal.fun/api/data');

        ws.onopen = function open() {
            let payload = {
                method: "subscribeNewToken",
            };
            ws.send(JSON.stringify(payload));
        };

        ws.onmessage = function message(event) {
            const parsedData = JSON.parse(event.data);
            setRealTime(prevData => {
                const updatedData = [parsedData, ...prevData];
                return updatedData.slice(0, 10);
            });

            // Trigger the animation when new data is received
            setAnimate(true);

            // Stop the animation after 3 seconds
            setTimeout(() => {
                setAnimate(false);
            }, 3000);
        };

        return () => {
            ws.close();
        };
    }, []);
    console.log(realTime);

    return (
        <div>
            <div className={`px-5 border border-white border-opacity-30 rounded-2xl py-2 ${animate ? 'shake-and-change-bg' : ''}`}>
                <p className="font-tektur text-xl font-semibold">New</p>

                {realTime?.length < 2 ?
                    data?.slice(0, 4).map((item, index) =>
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item} />
                            <p className="text-start w-fit uppercase">{item?.symbol}/SOL</p>
                            <p>${Number(item?.usd_market_cap).toFixed(2)}</p>
                        </a>
                    ) :
                    realTime?.slice(0, 4).map((item, index) => item?.message === "Successfully subscribed to token creation events." ? <></> :
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item} />
                            <p className="text-start w-fit uppercase">{item?.symbol}/SOL</p>
                            <p>{Number(item?.marketCapSol).toFixed(2)} SOL</p>
                        </a>
                    )
                }
            </div>
        </div>
    );
};

export default NewToken;
