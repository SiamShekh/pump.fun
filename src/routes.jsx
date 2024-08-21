import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./components/layouts/MainLayouts";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateToken from "./pages/CreateToken";
import TokenDetails from "./pages/TokenDetails";
import ErrorPage from "./components/ui/ErrorPage";
import VirtualWallets from "./pages/VirtualWallets";
import Admin from "./pages/Admin";
import AdminLayout from "./components/layouts/AdminLayout";
import Swapped from "./pages/Swapped";
import TokenCreated from "./pages/TokenCreated";


const MainRoutes = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <MainLayouts />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/profile/:mint",
                element: <Profile />
            },
            {
                path: "/create",
                element: <CreateToken />
            },
            {
                path: "/details/:id",
                element: <TokenDetails />
            },
            {
                path: '/admin/0x/virtual-wallets',
                element: <VirtualWallets />
            }
        ]
    },
    {
        path: '/admin',
        errorElement: <ErrorPage />,
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Admin />
            },
            {
                path: 'swapped',
                element: <Swapped />
            },
            {
                path: 'token-created',
                element: <TokenCreated />
            },
            {
                path: 'virtual-wallets',
                element: <VirtualWallets />
            }
        ]
    },
]);

export default MainRoutes;