import { handleActions } from "redux-actions";
import types from "./types";

const initialState = {
    loading: false,
    stores: {},
    top_data: [],
    nextPageRel: "",
};

const reducer = handleActions(
    {
        [types.GET_PLAYER_DATA_REQUEST]: (state, action) => ({
            ...state,
            loading: true,
        }),
        [types.GET_PLAYER_DATA_SUCCESS]: (state, action) => {
            const { payload } = action;
            const newState = { ...state, loading: false };
            if (typeof payload === "object") {
                const { stores, top_data, nextPageRel } = payload;
                if (typeof stores === "object") newState["stores"] = stores;
                if (Array.isArray(top_data)) newState["top_data"] = top_data;
                if (typeof nextPageRel === "string") newState["nextPageRel"] = nextPageRel;
            }
            return newState;
        },
        [types.GET_PLAYER_DATA_FAIL]: (state, action) => ({
            ...state,
            loading: false,
        }),
    },
    initialState
);

export default reducer;
