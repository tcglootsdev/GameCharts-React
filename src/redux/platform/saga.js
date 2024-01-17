// Modules
import { call, all, takeEvery, put, fork } from "redux-saga/effects";
import axios from "axios";

// Types
import actionTypes from "./types";

function* getPlatformData() {
    yield takeEvery(actionTypes.GET_PLATFORM_DATA_REQUEST, function* (action) {
        try {
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/api/platform.php",
                params: { source: action.payload.source },
            });
            const { data: responseData } = response;
            yield put({
                type: actionTypes.GET_PLATFORM_DATA_SUCCESS,
                payload: responseData,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_PLATFORM_DATA_FAIL,
                payload: error,
            });
        }
    });
}

export default function* platformSaga() {
    yield all([fork(getPlatformData)]);
}
