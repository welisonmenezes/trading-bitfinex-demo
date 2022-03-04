import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./GridHeader.scss";

function GridHeader({ isNegative = false }) {
    const [reverse, setReverse] = useState("");

    useEffect(() => {
        if (isNegative) {
            setReverse("flex-row-reverse");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`GridHeader d-flex align-items-start justify-content-between ${reverse}`}
        >
            <div>Count</div>
            <div>Amount</div>
            <div>Total</div>
            <div>Price</div>
        </div>
    );
}

GridHeader.propTypes = {
    isNegative: PropTypes.bool,
};

export default GridHeader;
