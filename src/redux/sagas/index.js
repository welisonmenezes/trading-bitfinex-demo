import { all } from "redux-saga/effects";
import handleOrdersMessage from "./orders";

export default function* rootSaga() {
    yield all([handleOrdersMessage()]);
}
