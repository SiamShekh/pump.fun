import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./components/layouts/MainLayouts";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateToken from "./pages/CreateToken";
import TokenDetails from "./pages/TokenDetails";
import TrackWallets from "./pages/TrackWallets";


const MainRoutes = createBrowserRouter([
    {
        path: '/',
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
                path: "/profile",
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
                path: "/track",
                element: <TrackWallets />
            },
        ]
    },
]);

export default MainRoutes;