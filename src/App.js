import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import appRouters from "./appRouters";

// Components
import Navigation from "./components/navigation";
import Footer from "./components/footer";

const App = () => {
    return (
        <React.StrictMode>
            <Navigation />
            <RouterProvider router={appRouters} />
            <Footer />
        </React.StrictMode>
    );
};

export default App;
