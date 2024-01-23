import { handleActions } from "redux-actions";
import types from "./types";

const initialState = {
    loading: false,
    stores: {},
    topdata: [],
    topdata_average: [],
    trending: [],
    trending_average: [],
};

const reducer = handleActions(
    {
        [types.GET_PLATFORM_DATA_REQUEST]: (state, action) => ({
            ...state,
            loading: true,
        }),
        [types.GET_PLATFORM_DATA_SUCCESS]: (state, action) => {
            const { payload } = action;
            const newState = { ...state, loading: false };
            if (typeof payload === "object") {
                const { stores, topdata, topdata_average, trending, trending_average } = payload;
                if (typeof stores === "object") newState["stores"] = stores;
                if (Array.isArray(trending)) newState["trending"] = trending;
                if (Array.isArray(trending_average)) newState["trending_average"] = trending_average;
                if (Array.isArray(topdata)) newState["topdata"] = topdata;
                if (Array.isArray(topdata_average)) newState["topdata_average"] = topdata_average;
            }
            return newState;
        },
        [types.GET_PLATFORM_DATA_FAIL]: (state, action) => ({
            ...state,
            loading: false,
        }),
    },
    initialState
);

export default reducer;
