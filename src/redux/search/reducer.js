import { handleActions, combineActions } from "redux-actions";
import types from "./types";

const initialState = {
    loading: false,
    result: [],
    matching_data: [],
    stores: {},
};

const reducer = handleActions(
    {
        [combineActions(types.GET_SEARCH_DATA_REQUEST, types.GET_SEARCH_DATA_WITH_JSON_SUCCESS)]: (state, action) => ({
            ...state,
            loading: true,
        }),
        [types.GET_SEARCH_DATA_WITH_JSON_SUCCESS]: (state, action) => {
            const { payload } = action;
            const newState = { ...state, loading: false };
            if (Array.isArray(payload)) {
                newState.result = payload;
            }
            return newState;
        },
        [types.GET_SEARCH_DATA_SUCCESS]: (state, action) => {
            const { matching_data, stores } = action.payload;
            const newState = { ...state, loading: false };
            if (Array.isArray(matching_data)) newState.matching_data = matching_data;
            if (typeof stores === "object") newState.stores = stores;
            return newState;
        },
        [combineActions(types.GET_SEARCH_DATA_FAIL, types.GET_SEARCH_DATA_WITH_JSON_FAIL)]: (state, action) => ({
            ...state,
            loading: false,
        }),
    },
    initialState
);

export default reducer;
