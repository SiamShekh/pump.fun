import { useEffect, useState } from "react";
import ImageProfileFallback from "../profile/ImageProfileFallback";
import { Link } from "react-router-dom";
const LastReplyCoin = () => {
    const [data, setData] = useState({});
    const [animate, setAnimate] = useState(false); 

    useEffect(() => {
        const ws = new WebSocket('wss://frontend-api.pump.fun/socket.io/?EIO=4&transport=websocket');

        ws.onopen = function open() {
            ws.send("40");
        };

        ws.onmessage = function message(event) {
            try {
                const data = event.data.slice(2);

                const parsedArray = JSON.parse(data);
                const eventName = parsedArray[0];
                const parsedData = parsedArray[1];
                
                // if (eventName === 'tradeCreated') {
                //     setData(parsedData);
                // }
                if (eventName === 'newReplyCreated') {
                    const reply = JSON.parse(JSON.parse(parsedData?.data?.subscribe?.data)?.payload)?.coin;
                    setData(reply);
                }
                setAnimate(true);
                setTimeout(() => {
                    setAnimate(false);
                }, 3000);
            } catch (error) {
                console.error("Failed to parse WebSocket message:", event.data);
            }
        };

        ws.onerror = function error(err) {
            console.error("WebSocket encountered an error:", err.message);
        };

        ws.onclose = function close() {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, [data]);

    return (
        <div className={`relative p-5 border overflow-hidden flex-col justify-center h-80 hidden lg:flex border-white border-opacity-30 rounded-2xl ${animate ? 'shake-and-change-bg' : ''}`}>
            <p className="font-tektur text-center underline mb-5">New Reply Created</p>
            <div className="flex gap-3 items-center mb-5">
                <ImageProfileFallback item={data} />
                <div className="">
                    <p className="font-tektur text-xl text-black line-clamp-1">{data?.name}</p>
                    <p className="font-poppins line-clamp-1">{data?.symbol}</p>
                </div>
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <p className="font-poppins my-5 line-clamp-3">{data?.description}</p>

            <Link to={`/details/${data?.mint}`} className="font-poppins text-xl px-7 py-2 border border-white mx-auto border-opacity-30 rounded-2xl">View</Link>
        </div>
    );
};

export default LastReplyCoin;