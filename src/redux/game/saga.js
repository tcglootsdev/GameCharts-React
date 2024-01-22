import { call, all, takeEvery, put, fork } from "redux-saga/effects";
import axios from "axios";

// Types
import actionTypes from "./types";

function* getGameData() {
    yield takeEvery(actionTypes.GET_GAME_DATA_REQUEST, function* (action) {
        try {
            const { source, nameseo } = action.payload;
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/api/game.php",
                params: { source, nameseo },
            });
            const { data } = response;
            yield put({
                type: actionTypes.GET_GAME_DATA_SUCCESS,
                payload: data,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_GAME_DATA_FAIL,
                payload: error,
            });
        }
    });
}

export default function* () {
    yield all([fork(getGameData)]);
}
