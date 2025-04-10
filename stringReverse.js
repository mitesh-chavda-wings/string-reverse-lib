// stringReverse.js
function reverseString(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return str.split('').reverse().join('');
}

// Export the function for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = reverseString;
} else {
    window.reverseString = reverseString; // Make it available globally in browsers
}