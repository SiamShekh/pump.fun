import ImageWithFallback from "./ImageFallbackHome";
import "../home/Text_Colors.css";
import { useEffect, useState } from "react";

const ForYou = ({ data }) => {

    const TimeStampToTime = (timestamp) => {
        const date = new Date(timestamp);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });

        const formattedTime = `${hours}:${minutes} ${ampm} - ${day} ${month}`;
        return formattedTime;
    }

    const [list, setList] = useState(data);

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

                if (eventName === 'tradeCreated') {
                    setList([parsedData, ...list, data]);
                }

            } catch (error) {
                // console.error("Failed to parse WebSocket message:", event.data);
            }
        };

        ws.onerror = function error(err) {
            // console.error("WebSocket encountered an error:", err.message);
        };

        ws.onclose = function close() {
            // console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, [list]);

    console.log(list);

    return (
        <div>
            <div className="border border-white border-opacity-30 rounded-2xl px-5 py-2">
                <p className="font-tektur text-xl font-semibold">For you</p>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Marketcap</th>
                                <th>Creator</th>
                                <th>Created time</th>
                                <th>Last trade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list?.slice(0,50)?.map((item, index) =>
                                    <tr key={index} className="font-poppins">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <ImageWithFallback item={item} />

                                                <div>
                                                    <div className="font-bold uppercase animated-text">{item?.symbol}</div>
                                                    <div className="text-sm opacity-50 animated-text">{item?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${Number(item?.usd_market_cap).toFixed(2)}</td>
                                        <td>{<a className="hover:underline" href={`/profile/${item?.creator}`}>{String(item?.creator).slice(0, 10) + "..."}</a>}</td>
                                        <td>{TimeStampToTime(item?.created_timestamp)}</td>
                                        <td>{TimeStampToTime(item?.last_trade_timestamp)}</td>
                                        <th>
                                            <a href={`/details/${item?.mint}`} className="btn btn-ghost btn-xs">trade</a>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default ForYou;