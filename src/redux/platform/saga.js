import { call, all, takeEvery, put, fork } from "redux-saga/effects";
import axios from "axios";

// Types
import actionTypes from "./types";

function* getPlatformData() {
    yield takeEvery(actionTypes.GET_PLATFORM_DATA_REQUEST, function* (action) {
        try {
            const { source } = action.payload;
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/api/platform.php",
                params: { source },
            });
            const { data } = response;
            yield put({
                type: actionTypes.GET_PLATFORM_DATA_SUCCESS,
                payload: data,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_PLATFORM_DATA_FAIL,
                payload: error,
            });
        }
    });
}

export default function* () {
    yield all([fork(getPlatformData)]);
}
