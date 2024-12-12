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