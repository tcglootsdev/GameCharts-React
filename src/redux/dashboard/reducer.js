import { handleActions } from "redux-actions";
import types from "./types";

const initialState = {
    loading: false,
    trending: [],
    trending_average: [],
    stores: [],
    topdata: [],
    topdata_average: [],
};

const reducer = handleActions(
    {
        [types.GET_DASHBOARD_DATA_REQUEST]: (state, action) => ({
            ...state,
            loading: true,
        }),
        [types.GET_DASHBOARD_DATA_SUCCESS]: (state, action) => {
            const { payload } = action;
            const newState = { ...state, loading: false };
            if (typeof payload === "object") {
                const { trending, trending_average, stores, topdata, topdata_average } = payload;
                if (Array.isArray(trending)) newState["trending"] = trending;
                if (Array.isArray(trending_average)) newState["trending_average"] = trending_average;
                if (typeof stores === "object") newState["stores"] = stores;
                if (Array.isArray(topdata)) newState["topdata"] = topdata;
                if (Array.isArray(topdata_average)) newState["topdata_average"] = topdata_average;
            }
            return newState;
        },
        [types.GET_DASHBOARD_DATA_FAIL]: (state, action) => ({
            ...state,
            loading: false,
        }),
    },
    initialState
);

export default reducer;
