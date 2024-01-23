import dashboardReducer from "./dashboard/reducer";
import gameReducer from "./game/reducer";
import platformReducer from "./platform/reducer";

const appReducer = {
    dashboard: dashboardReducer,
    game: gameReducer,
    platform: platformReducer,
};

export default appReducer;
