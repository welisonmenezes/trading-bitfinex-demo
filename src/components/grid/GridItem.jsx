import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./GridItem.scss";

import { getChartBg } from "../../utils";

function GridItem({ order, amount, cumulative, percentage, isNetative, isUp }) {
    const [up, setUp] = useState(false);

    useEffect(() => {
        setUp(isUp);

        const timer = setTimeout(() => {
            setUp(false);
        }, 350);

        return () => {
            clearTimeout(timer);
        };
    }, [isUp]);

    const getTransitionCssClass = useCallback(() => {
        return up ? "is-up" : "is-down";
    }, [up]);

    const getIsNetativeCssClass = useCallback(() => {
        return isNetative ? "is-negative" : "is-positive";
    }, [isNetative]);

    return (
        <div
            className={`GridItem d-flex align-items-start justify-content-between ${getTransitionCssClass()} ${getIsNetativeCssClass()}`}
            style={{
                backgroundImage: getChartBg(percentage, isNetative),
            }}
        >
            <div>{order.quantity}</div>
            <div>{amount.toFixed(4)}</div>
            <div>{cumulative.toFixed(4)}</div>
            <div>{order.price.toLocaleString("en-US")}</div>
        </div>
    );
}

GridItem.propTypes = {
    order: PropTypes.shape({
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
    }),
    amount: PropTypes.number.isRequired,
    cumulative: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    isNetative: PropTypes.bool.isRequired,
    isUp: PropTypes.bool.isRequired,
};

export default GridItem;
