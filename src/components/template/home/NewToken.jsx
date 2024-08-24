import { useEffect, useState } from "react";
import ImageWithFallback from "./ImageFallbackHome";
import "../home/Text_Colors.css";

const NewToken = ({ data }) => {
    const [animate, setAnimate] = useState(false); 
    const [realTime, setRealTime] = useState([]);

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

    return (
        <div>
            <div className={`px-5 border border-white border-opacity-30 rounded-2xl py-2 ${animate ? 'shake-and-change-bg' : ''}`}>
                <p className="font-tektur text-xl font-semibold">New</p>

                {realTime?.length < 2 ?
                    data?.slice(0, 4).map((item, index) =>
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item} />
                            <p className="text-start w-fit uppercase animated-text">{item?.symbol}/SOL</p>
                            <p>${Number(item?.usd_market_cap).toFixed(2)}</p>
                        </a>
                    ) :
                    realTime?.slice(0, 4).map((item, index) => item?.message === "Successfully subscribed to token creation events." ? <div key={index}></div> :
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item} />
                            <p className="text-start w-fit uppercase animated-text">{item?.symbol}/SOL</p>
                            <p>{Number(item?.marketCapSol).toFixed(2)} SOL</p>
                        </a>
                    )
                }
            </div>
        </div>
    );
};

export default NewToken;
