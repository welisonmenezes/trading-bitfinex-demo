import { call, put, takeLatest, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import orderSocket from "../../websocket";
import {
    ORDERS_ADD,
    ORDERS_CONNECTED,
    ORDERS_CONNECTING,
    ORDERS_ERROR,
    ORDERS_INITIALIZE,
    EMIT_CONNECTED,
    EMIT_INITIALIZE_DATA,
    EMIT_ADD_DATA,
    EMIT_ERROR,
    EMIT_RECONNECT,
} from "../constants";

function getWsChannel(websocket) {
    let hasError = false;
    return eventChannel((emitter) => {
        websocket.onopen = () => {
            emitter({ type: "EMIT_CONNECTED" });
            websocket.send(
                JSON.stringify({
                    event: "subscribe",
                    channel: "book",
                    symbol: "tBTCUSD",
                })
            );
        };
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data instanceof Array && data[1] && data[1].length >= 50) {
                emitter({ type: EMIT_INITIALIZE_DATA, payload: data });
            } else if (
                data instanceof Array &&
                data[1] &&
                data[1].length === 3
            ) {
                emitter({ type: EMIT_ADD_DATA, payload: data });
            }
        };
        websocket.onerror = (event) => {
            hasError = true;
            emitter({ type: EMIT_ERROR });
        };
        websocket.onclose = (event) => {
            if (hasError) return;
            setTimeout(() => {
                emitter({ type: EMIT_RECONNECT });
            }, 1000);
        };
        return () => {
            websocket.close();
        };
    });
}

export function* watchMessages(eventChannel) {
    while (true) {
        const event = yield take(eventChannel);
        switch (event.type) {
            case EMIT_INITIALIZE_DATA:
                yield put({
                    type: ORDERS_INITIALIZE,
                    payload: event.payload,
                });
                break;
            case EMIT_ADD_DATA:
                yield put({
                    type: ORDERS_ADD,
                    payload: event.payload,
                });
                break;
            case EMIT_CONNECTED:
                yield put({ type: ORDERS_CONNECTED });
                break;
            case EMIT_RECONNECT:
                yield put({ type: ORDERS_CONNECTING });
                break;
            case EMIT_ERROR:
                yield put({
                    type: ORDERS_ERROR,
                    payload: "Error trying to connect.",
                });
                break;
            default:
                break;
        }
    }
}

function* socketOrders() {
    try {
        const websocket = orderSocket();
        const eventChannel = yield call(getWsChannel, websocket);
        yield call(watchMessages, eventChannel);
    } catch (error) {
        yield put({ type: ORDERS_ERROR });
    }
}

const handleOrdersMessage = function* handleOrdersMessage() {
    yield takeLatest(ORDERS_CONNECTING, socketOrders);
};

export default handleOrdersMessage;
