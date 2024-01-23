import { createAction } from "redux-actions";

// Types
import actionTypes from "./types";

export const getPlayerData = createAction(actionTypes.GET_PLAYER_DATA_REQUEST);