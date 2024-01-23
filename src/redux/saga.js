// Modules
import { all } from "redux-saga/effects";

// Saga
import dashboardSaga from "./dashboard/saga";
import gameSaga from "./game/saga";
import platformSaga from "./platform/saga";
import searchSaga from "./search/saga";

export default function* () {
    yield all([dashboardSaga(), gameSaga(), platformSaga(), searchSaga()]);
}
