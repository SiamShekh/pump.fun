import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCreateWalletsQuery } from "../rtk/TokenListApi";

const MainLayouts = () => {
    const { publicKey } = useWallet();
    useCreateWalletsQuery(publicKey?.toBase58());
    
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