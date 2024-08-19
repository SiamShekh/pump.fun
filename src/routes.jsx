import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./components/layouts/MainLayouts";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateToken from "./pages/CreateToken";
import TokenDetails from "./pages/TokenDetails";
import ErrorPage from "./components/ui/ErrorPage";


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
            
        ]
    },
]);

export default MainRoutes;