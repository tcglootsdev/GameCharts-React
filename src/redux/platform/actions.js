import { createAction } from "redux-actions";

// Types
import actionTypes from "./types";

export const getPlatformData = createAction(actionTypes.GET_PLATFORM_DATA_REQUEST);