import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayouts = () => {
    return (
        <div data-theme="synthwave" className="mx-auto h-screen">
            <nav className="max-h-[20vh] fixed top-0 w-full">
                <Navbar />
            </nav>

            <section className="pt-[20vh]">
                <Outlet />
            </section>
        </div>
    );
};

export default MainLayouts;