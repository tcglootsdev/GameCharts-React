// Modules
import { all } from "redux-saga/effects";

// Saga
import dashboardSaga from "./dashboard/saga";

export default function* () {
    yield all([
        dashboardSaga()
    ]);
}