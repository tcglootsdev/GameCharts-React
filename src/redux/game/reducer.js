import { handleActions } from "redux-actions";
import types from "./types";

const initialState = {
    loading: false,
    stores: [],
    fullaverage_aux: [],
    fulldata_aux: [],
    gamedata_aux: [],
    gameinfo_aux: [],
    month_data_array: {},
    today_aux: [],
    weekago_aux: [],
    yesterday_aux: [],
};

const reducer = handleActions(
    {
        [types.GET_GAME_DATA_REQUEST]: (state, action) => ({
            ...state,
            loading: true,
        }),
        [types.GET_GAME_DATA_SUCCESS]: (state, action) => {
            const { payload } = action;
            const newState = { ...state, loading: false };
            if (typeof payload === "object") {
                const { stores, fullaverage_aux, fulldata_aux, gamedata_aux, gameinfo_aux, month_data_array, today_aux, weekago_aux, yesterday_aux } =
                    payload;
                if (Array.isArray(stores)) newState["stores"] = stores;
                if (Array.isArray(fullaverage_aux)) newState["fullaverage_aux"] = fullaverage_aux;
                if (Array.isArray(fulldata_aux)) newState["fulldata_aux"] = fulldata_aux;
                if (Array.isArray(gamedata_aux)) newState["gamedata_aux"] = gamedata_aux;
                if (Array.isArray(gameinfo_aux)) newState["gameinfo_aux"] = gameinfo_aux;
                if (typeof month_data_array === 'object') newState["month_data_array"] = month_data_array;
                if (Array.isArray(today_aux)) newState["today_aux"] = today_aux;
                if (Array.isArray(weekago_aux)) newState["weekago_aux"] = weekago_aux;
                if (Array.isArray(yesterday_aux)) newState["yesterday_aux"] = yesterday_aux;
            }
            return newState;
        },
        [types.GET_GAME_DATA_FAIL]: (state, action) => ({
            ...state,
            loading: false,
        }),
    },
    initialState
);

export default reducer;
