import { createAction } from "redux-actions";

// Types
import actionTypes from "./types";

export const getGameData = createAction(actionTypes.GET_GAME_DATA_REQUEST);