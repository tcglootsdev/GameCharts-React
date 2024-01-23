import dashboardReducer from "./dashboard/reducer";
import gameReducer from "./game/reducer";
import platformReducer from "./platform/reducer";
import searchReducer from "./search/reducer";
import playerReducer from "./player/reducer";

const appReducer = {
    dashboard: dashboardReducer,
    game: gameReducer,
    platform: platformReducer,
    search: searchReducer,
    player: playerReducer,
};

export default appReducer;
