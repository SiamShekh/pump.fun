import { NavLink } from "react-router-dom";
import icons from "../../assets/icons/icons.webp";

const Navbar = () => {
    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md w-full p-5 flex justify-between font-tektur">
                <img src={icons} alt="logos" className="size-10" />
                <div className="flex items-center gap-5">
                    <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-opacity-100 text-white' : 'text-white text-opacity-50 '}`}>Board</NavLink>

                    <NavLink to={'/create'} className={({ isActive }) => `${isActive ? 'text-opacity-100 text-white' : 'text-white text-opacity-50 '}`}>New Token</NavLink>

                    <NavLink to={'/track'} className={({ isActive }) => `${isActive ? 'text-opacity-100 text-white' : 'text-white text-opacity-50 '}`}>Track Wallets</NavLink>
                </div>

                <button className="border h-fit my-auto px-7 py-2 border-b-4 border-r-4">Connect</button>

            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
    );
};

export default Navbar;