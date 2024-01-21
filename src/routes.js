import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

// Containers
const Dashboard = lazy(() => import("@/containers/dashboard"));
const Platform = lazy(() => import("@/containers/platform"));
const Game = lazy(() => import("@/containers/game"));
const Search = lazy(() => import("@/containers/search"));
const Player = lazy(() => import("@/containers/player"));
const About = lazy(() => import("@/containers/about"));
const Privacy = lazy(() => import("@/containers/privacy"));
const Cookies = lazy(() => import("@/containers/cookies"));

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
