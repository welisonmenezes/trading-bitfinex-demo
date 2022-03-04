import React from "react";
import PropTypes from "prop-types";

import "./Error.scss";

function Error({ message }) {
    return (
        <div className="Error d-flex justify-content-center align-items-start">
            <p>{message}</p>
        </div>
    );
}

Error.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Error;
