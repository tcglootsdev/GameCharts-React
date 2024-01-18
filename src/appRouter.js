// Modules
import { useRoutes } from "react-router-dom";

// Containers
import Dashboard from "./containers/dashboard";
import Platform from "./containers/platform";
import Game from "./containers/game";
import Search from "./containers/search";

const AppRouter = () => {
    return useRoutes([
        {
            path: "/",
            element: <Dashboard />,
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
