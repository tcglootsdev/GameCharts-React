import { call, all, takeEvery, put, fork } from "redux-saga/effects";
import axios from "axios";

// Types
import actionTypes from "./types";

function* getSearchDataWithJson() {
    yield takeEvery(actionTypes.GET_SEARCH_DATA_WITH_JSON_REQUEST, function* (action) {
        try {
            const { searchValue } = action.payload;
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/data/search/" + searchValue + ".json",
            });
            const { data } = response;
            yield put({
                type: actionTypes.GET_SEARCH_DATA_WITH_JSON_SUCCESS,
                payload: data,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_SEARCH_DATA_WITH_JSON_FAIL,
                payload: error,
            });
        }
    });
}

function* getSearchData() {
    yield takeEvery(actionTypes.GET_SEARCH_DATA_REQUEST, function* (action) {
        try {
            const { searchValue } = action.payload;
            const response = yield call(axios.request, {
                method: "get",
                url: "https://gamecharts.org/api/search.php",
                params: { search: searchValue },
            });
            const { data } = response;
            yield put({
                type: actionTypes.GET_SEARCH_DATA_SUCCESS,
                payload: data,
            });
        } catch (error) {
            yield put({
                type: actionTypes.GET_SEARCH_DATA_FAIL,
                payload: error,
            });
        }
    });
}

export default function* () {
    yield all([fork(getSearchDataWithJson), fork(getSearchData)]);
}
