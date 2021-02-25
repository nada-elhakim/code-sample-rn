const commaNumber = require('comma-number');

function formatNumber(number, min = 2, max = 7) {
    if (!number) {
        return "0.00";
    }
    const decimalCount = getDecimalCount(number);
    if (decimalCount < min) {
        return commaNumber(number.toFixed(min));
    }
    if (decimalCount > max) {
        return commaNumber(number.toFixed(max));
    }
    return commaNumber(number);
}

function getDecimalCount(number) {
    if(Math.floor(number) === number) return 0;
    return number.toString().split(".")[1].length || 0;
}
export {
    formatNumber
};