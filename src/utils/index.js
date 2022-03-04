export const orderFactory = (arrOrder, index=0) => {
    return {
        price: arrOrder[0],
        quantity: arrOrder[1],
        amount: arrOrder[2],
        index: index
    };
};

export const getPercentage = (total, cumulative) => {
    return (cumulative / total) * 100;
};

export const getPositiveValue = (value) => {
    return value < 0 ? value * -1 : value;
};

export const getChartBg = (size, isNegative = false) => {
    const bgColor = isNegative ? "#403340" : "#12454C";
    const bgPosition = isNegative ? "to right" : "to left";
    return `linear-gradient(${bgPosition}, ${bgColor}, ${bgColor} ${size}%, transparent ${size}%)`;
};
