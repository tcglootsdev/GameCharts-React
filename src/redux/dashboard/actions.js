import { createAction } from "redux-actions";

// Types
import actionTypes from "./types";

export const getDashboardData = createAction(actionTypes.GET_DASHBOARD_DATA_REQUEST);