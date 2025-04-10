// stringReverse.js
function reverseString(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.split('').reverse().join('');
}

function countString(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.length;
}

// Export both functions for browser use
window.reverseString = reverseString;
window.countString = countString;