import dashboardReducer from "./dashboard/reducer";
import gameReducer from "./game/reducer";

const appReducer = {
    dashboard: dashboardReducer,
    game: gameReducer
}

export default appReducer;