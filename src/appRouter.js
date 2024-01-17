// Modules
import { useRoutes } from "react-router-dom";

// Containers
import Dashboard from "./containers/dashboard";
import Platform from "./containers/platform";
import Game from "./containers/game";

const AppRouter = () => {
    return useRoutes([
        {
            path: "/",
            element: <Dashboard />,
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
