import { NavLink } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import icons from "../../assets/icons/onlypumps_logo.webp";

const Nav = <>
    <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-opacity-100 text-white' : 'text-white text-opacity-50 '}`}>Board</NavLink>

    <NavLink to={'/create'} className={({ isActive }) => `${isActive ? 'text-opacity-100 text-white' : 'text-white text-opacity-50 '}`}>New Token</NavLink>

</>;

const Navbar = () => {

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md w-full p-5 flex justify-between font-tektur">
                <div className="dropdown  my-auto block md:hidden">
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        tabIndex={0} role="button"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>

                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        {Nav}
                    </ul>
                </div>

                <img src={icons} alt="logos" className="w-20 md:block hidden" />
                <div className="md:flex items-center gap-5 hidden">
                    {Nav}
                </div>
                <WalletMultiButton />
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
    );
};

export default Navbar;