import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayouts = () => {
    return (
        <div data-theme="synthwave" className="mx-auto">
            <nav>
                <Navbar />
            </nav>
            <Outlet />
        </div>
    );
};

export default MainLayouts;