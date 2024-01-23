import { call, all, takeEvery, put, fork } from "redux-saga/effects";
import axios from "axios";

// Types
import actionTypes from "./types";

function* getPlayerData() {
    yield takeEvery(actionTypes.GET_PLAYER_DATA_REQUEST, function* (action) {
        try {
            const { source, type, page } = action.payload;
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/api/player.php",
                params: { source, type, page },
            });
            const { data } = response;
            yield put({
                type: actionTypes.GET_PLAYER_DATA_SUCCESS,
                payload: data,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_PLAYER_DATA_FAIL,
                payload: error,
            });
        }
    });
}

export default function* () {
    yield all([fork(getPlayerData)]);
}
