// Modules
import { useRoutes } from "react-router-dom";

// Containers
import Dashboard from "./containers/dashboard";
import Platform from "./containers/platform";
import Game from "./containers/game";
import Search from "./containers/search";
import Player from "./containers/player";

const AppRouter = () => {
    return useRoutes([
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/:source/player_count",
            element: <Player type='ccu' />,
        },
        {
            path: "/:source/player_average",
            element: <Player type='avg' />,
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
