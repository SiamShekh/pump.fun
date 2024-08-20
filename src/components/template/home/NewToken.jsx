import { useEffect, useState } from "react";
import ImageWithFallback from "./ImageFallbackHome";

const NewToken = ({ data }) => {

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
        };

        return () => {
            ws.close();
        };
    }, []);


    return (
        <div>
            <div className=" BorderAnim  px-5 py-2">
                <p className="font-tektur text-xl font-semibold">New</p>
                

                {
                    realTime?.length > 5 &&
                    realTime?.slice(0, 4).map((item, index) =>
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item}/>
                            <p className="text-start w-fit uppercase">{item?.symbol}/SOL</p>
                            <p>{Number(item?.marketCapSol).toFixed(2)} SOL</p>
                        </a>
                    )
                }

                {
                    realTime?.length < 5 &&
                    data?.slice(0, 4).map((item, index) =>
                        <a href={`/details/${item?.mint}`} key={index} className="flex justify-between gap-3 my-2 ">
                            <ImageWithFallback item={item}/>
                            <p className="text-start w-fit uppercase">{item?.symbol}/SOL</p>
                            <p>${Number(item?.usd_market_cap).toFixed(2)}</p>
                        </a>
                    )
                }
            </div>
        </div >
    );
};

export default NewToken;