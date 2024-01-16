import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./containers/dashboard";

export default createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    }
]);