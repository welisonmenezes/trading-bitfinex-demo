const orderSocket = () => {
    const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    return socket;
};

export default orderSocket;
