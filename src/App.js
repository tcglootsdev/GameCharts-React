import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Store
import store from "./redux/store";

// Routes
import Routes from "./routes";

// Components
const Navigation = lazy(() => import("./components/navigation"));
const Footer = lazy(() => import("./components/footer"));

// Styles
import "./App.css";
import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense>
          <Navigation />
          <div className={cx("content-wrapper")}>
            <Routes />
          </div>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
