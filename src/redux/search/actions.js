import { createAction } from "redux-actions";

// Types
import actionTypes from "./types";

export const getSearchDataWithJSON = createAction(actionTypes.GET_SEARCH_DATA_WITH_JSON_REQUEST);
export const getSearchData = createAction(actionTypes.GET_SEARCH_DATA_REQUEST);