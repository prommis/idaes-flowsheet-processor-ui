export function round(value, decimal) {
    if (decimal) {
        let factor = 10 ** decimal
        return Math.round( value * factor) / factor
    } else return Math.round(value)
    
}

export function roundList(values, decimal) {
    let result = []
    for (let each of values) {
        result.push(round(each, decimal))
    }
    return result
}

export function getVersionDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    yyyy = yyyy.toString().substring(2)
    
    let version = `${yyyy}.${mm}.${dd}`
    return version
}

export function formatValueWithScientificNotation(value, decimals=3, sciThreshold = 1e-3) {
    if (value === 0) {
        return (0).toFixed(decimals);
    }

    const absVal = Math.abs(value);

    // Use scientific notation for tiny numbers
    if (absVal < sciThreshold) {
        return value.toExponential(decimals);
    }
    return value.toFixed(decimals);
}