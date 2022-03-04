import { orderFactory } from "../../utils";
import {
    ORDERS_CONNECTING,
    ORDERS_CONNECTED,
    ORDERS_ADD,
    ORDERS_ERROR,
    ORDERS_INITIALIZE,
} from "../constants";

const initialState = {
    buy_orders: [],
    sale_orders: [],
    connecting: false,
    error: null,
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case ORDERS_CONNECTING:
            return { ...state, connecting: true };

        case ORDERS_CONNECTED:
            return { ...state, connecting: false, error: null };

        case ORDERS_INITIALIZE:
            const new_orders = action.payload[1].map((order) => {
                return orderFactory(order);
            });
            const buy_orders = new_orders.filter((order) => order.amount >= 0);
            const sale_orders = new_orders.filter((order) => order.amount < 0);

            return {
                ...state,
                buy_orders: buy_orders,
                sale_orders: sale_orders,
            };

        case ORDERS_ADD:
            const amount = action.payload[1][2];
            const price = action.payload[1][0];

            if (action.payload[1][1] === 0) {
                return state;
            } else if (amount >= 0) {
                const buy_orders = [...state.buy_orders];
                const index = buy_orders.findIndex(
                    (order) => order.price === price
                );

                if (index >= 0) {
                    buy_orders[index] = orderFactory(action.payload[1], index);
                } else {
                    buy_orders.unshift(orderFactory(action.payload[1]));
                    if (buy_orders.length > 25) {
                        buy_orders.pop();
                    }
                }

                return { ...state, buy_orders: buy_orders };
            } else {
                const sale_orders = [...state.sale_orders];
                const index = sale_orders.findIndex(
                    (order) => order.price === price
                );

                if (index >= 0) {
                    sale_orders[index] = orderFactory(action.payload[1], index);
                } else {
                    sale_orders.unshift(orderFactory(action.payload[1]));
                    if (sale_orders.length > 25) {
                        sale_orders.pop();
                    }
                }

                return { ...state, sale_orders: sale_orders };
            }

        case ORDERS_ERROR:
            return { ...state, error: action.payload, connecting: false };

        default:
            return state;
    }
};

export default orders;
