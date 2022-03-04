import {
    ORDERS_CONNECTING,
    ORDERS_CONNECTED,
    ORDERS_ADD,
    ORDERS_ERROR,
    ORDERS_INITIALIZE,
} from "../constants";

export const ordersConnecting = () => ({
    type: ORDERS_CONNECTING,
});

export const ordersConnected = () => ({
    type: ORDERS_CONNECTED,
});

export const ordersInitialize = (orders) => ({
    type: ORDERS_INITIALIZE,
    payload: orders,
});

export const ordersAdd = (order) => ({
    type: ORDERS_ADD,
    payload: order,
});

export const ordersError = () => ({
    type: ORDERS_ERROR,
});
