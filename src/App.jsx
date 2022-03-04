import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./App.scss";
import Error from "./components/error/Error";
import Grid from "./components/grid/Grid";
import Spinner from "./components/spinner/Spinner";

import { ordersConnecting } from "./redux/actions";

function App() {
    const dispatch = useDispatch();
    const connecting = useSelector((state) => state.orders.connecting);
    const error = useSelector((state) => state.orders.error);

    useEffect(() => {
        dispatch(ordersConnecting());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App d-flex align-items-center justify-content-center">
            {connecting && <Spinner />}
            {!connecting && error && <Error message={error} />}
            {!connecting && !error && <Grid />}
        </div>
    );
}

export default App;
