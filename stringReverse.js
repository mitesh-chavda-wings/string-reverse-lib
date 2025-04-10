// stringReverse.js
class StringUtils {
    reverseString(str) {
        if (typeof str !== 'string') throw new Error('Input must be a string');
        return str.split('').reverse().join('');
    }

    countString(str) {
        if (typeof str !== 'string') throw new Error('Input must be a string');
        return str.length;
    }

    capitalizeString(str) {
        if (typeof str !== 'string') throw new Error('Input must be a string');
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Export for browser use
window.StringUtils = StringUtils;