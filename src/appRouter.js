// Modules
import { useRoutes } from "react-router-dom";

// Containers
import Dashboard from "./containers/dashboard";
import Platform from "./containers/platform";
import Game from "./containers/game";
import Search from "./containers/search";
import Player from "./containers/player";
import About from "./containers/about";
import Privacy from "./containers/privacy";
import Cookies from "./containers/cookies";

const AppRouter = () => {
    return useRoutes([
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/privacy",
            element: <Privacy />,
        },
        {
            path: "cookies",
            element: <Cookies />,
        },
        {
            path: "/:source/player_count",
            element: <Player type="ccu" />,
        },
        {
            path: "/:source/player_average",
            element: <Player type="avg" />,
        },
        {
            path: "/search/:searchValue",
            element: <Search />,
        },
        {
            path: "/:source",
            element: <Platform />,
        },
        {
            path: "/:source/:nameseo",
            element: <Game />,
        },
    ]);
};

export default AppRouter;
