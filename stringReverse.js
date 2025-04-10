// stringReverse.js
function reverseString(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.split('').reverse().join('');
}

function countString(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.length;
}

function capitalizeString(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export both functions for browser use
window.reverseString = reverseString;
window.countString = countString;
window.capitalizeString = capitalizeString;