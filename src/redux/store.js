import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "./reducers";
import rootSaga from "./sagas";

const persitConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persitConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
)(createStore)(persistedReducer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
