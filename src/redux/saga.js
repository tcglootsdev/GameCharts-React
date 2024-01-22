// Modules
import { all } from "redux-saga/effects";

// Saga
import dashboardSaga from "./dashboard/saga";
import gameSaga from "./game/saga";

export default function* () {
    yield all([
        dashboardSaga(),
        gameSaga(),
    ]);
}