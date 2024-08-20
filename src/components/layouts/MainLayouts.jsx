import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCreateWalletsQuery } from "../rtk/TokenListApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

const MainLayouts = () => {
    const { publicKey } = useWallet();
    useCreateWalletsQuery(publicKey?.toBase58());
    let ToastId;
    // useEffect(() => {
    //     const ws = new WebSocket('wss://frontend-api.pump.fun/socket.io/?EIO=4&transport=websocket');

    //     ws.onopen = function open() {
    //         ws.send("40");
    //     };

    //     ws.onmessage = function message(event) {
    //         // Parsing and handling the incoming WebSocket messages
    //         try {
    //             const data = event.data.slice(2);

    //             const parsedArray = JSON.parse(data);
    //             const eventName = parsedArray[0];
    //             const parsedData = parsedArray[1];
                
                

    //         } catch (error) {
    //             console.error("Failed to parse WebSocket message:", event.data);
    //         }
    //     };

    //     ws.onerror = function error(err) {
    //         console.error("WebSocket encountered an error:", err.message);
    //     };

    //     ws.onclose = function close() {
    //         console.log("WebSocket connection closed");
    //     };

    //     // Clean up the WebSocket connection when the component is unmounted
    //     return () => {
    //         ws.close();
    //     };
    // }, []);

    return (
        <div data-theme="synthwave" className="mx-auto">
            <nav className="max-h-[15vh] fixed top-0 w-full z-50">
                <Navbar />
            </nav>
            <section className="pt-[15vh] max-w-[1200px] mx-auto z-0 relative pb-10">
                <Outlet />
            </section>
        </div>
    );
};

export default MainLayouts;