// Modules
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Saga
import appSaga from "./appSaga";

// Reducer
import appReducer from "./appReducer";

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const appStore = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(appSaga);

export default appStore;
