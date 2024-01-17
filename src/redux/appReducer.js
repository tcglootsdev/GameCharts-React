import dashboardReducer from "./dashboard/reducer";
import platformReducer from "./platform/reducer";

const appReducer = {
    dashboard: dashboardReducer,
    platform: platformReducer,
};

export default appReducer;
