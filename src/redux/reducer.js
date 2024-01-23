import dashboardReducer from "./dashboard/reducer";
import gameReducer from "./game/reducer";
import platformReducer from "./platform/reducer";
import searchReducer from "./search/reducer";

const appReducer = {
    dashboard: dashboardReducer,
    game: gameReducer,
    platform: platformReducer,
    search: searchReducer,
};

export default appReducer;
