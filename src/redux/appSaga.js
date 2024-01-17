// Modules
import { all } from "redux-saga/effects";

// Saga
import dashboardSaga from "./dashboard/saga";
import platformSaga from "./platform/saga";

export default function* () {
    yield all([dashboardSaga(), platformSaga()]);
}
