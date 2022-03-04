import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Grid.scss";

import { getPercentage, getPositiveValue } from "../../utils";
import GridItem from "./GridItem";
import Spinner from "../spinner/Spinner";
import GridHeader from "./GridHeader";

function Grid() {
    const buy_orders = useSelector((state) => state.orders.buy_orders);
    const sale_orders = useSelector((state) => state.orders.sale_orders);
    const [buys, setBuys] = useState(null);
    const [sales, setSales] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const getTotalOrders = useCallback((orders) => {
        return orders.reduce(
            (prev, order) => prev + getPositiveValue(order.amount),
            0
        );
    }, []);

    const sortOrders = useCallback((orders, desc = false) => {
        if (desc) {
            orders.sort((a, b) => {
                if (a.price < b.price) return -1;
                if (a.price > b.price) return 1;
                return 0;
            });
        } else {
            orders.sort((a, b) => {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
            });
        }
    }, []);

    const renderGridItems = (orders, isNegative = false) => {
        let cumulative = 0;
        return orders.map((order, index) => {
            const amount = getPositiveValue(order.amount);
            cumulative = cumulative += amount;
            const percentage = getPercentage(
                getTotalOrders(orders),
                cumulative
            );
            const prefix = isNegative ? "os_" : "ob_";
            return (
                <GridItem
                    key={`${prefix}${index}`}
                    order={order}
                    amount={amount}
                    cumulative={cumulative}
                    percentage={percentage}
                    isNetative={isNegative}
                    isUp={order.index > index}
                />
            );
        });
    };

    useEffect(() => {
        const buys = [...buy_orders];
        sortOrders(buys);
        setBuys(buys);
    }, [buy_orders, sortOrders]);

    useEffect(() => {
        const sales = [...sale_orders];
        sortOrders(sales, true);
        setSales(sales);
    }, [sale_orders, sortOrders]);

    useEffect(() => {
        if (buy_orders.length > 0 && sale_orders.length > 0) {
            setIsReady(true);
        }
    }, [buy_orders, sale_orders]);

    return (
        <>
            {isReady && (
                <div className="Grid d-flex align-items-start justify-content-between">
                    <div>
                        <GridHeader />
                        {buys && renderGridItems(buys)}
                    </div>
                    <div>
                        <GridHeader isNegative={true} />
                        {sales && renderGridItems(sales, true)}
                    </div>
                </div>
            )}
            {!isReady && <Spinner />}
        </>
    );
}

export default Grid;
