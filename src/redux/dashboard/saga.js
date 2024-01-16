// Modules
import { call, all, takeEvery, put, fork } from "redux-saga/effects";
import axios from "axios";

// Types
import actionTypes from "./types";

function* getDashboardData() {
    yield takeEvery(actionTypes.GET_DASHBOARD_DATA_REQUEST, function* (action) {
        try {
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/api/dashboard.php",
            });
            const { data: responseData } = response;
            yield put({
                type: actionTypes.GET_DASHBOARD_DATA_SUCCESS,
                payload: responseData,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_DASHBOARD_DATA_FAIL,
                payload: error,
            });
        }
    });
}

export default function* dashboardSaga() {
    yield all([fork(getDashboardData)]);
}
