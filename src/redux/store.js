// Modules
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Saga
import saga from "./saga";

// Reducer
import reducer from "./reducer";

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const appStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(saga);

export default appStore;
