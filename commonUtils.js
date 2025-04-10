// commonUtils.js
class CommonUtils {
    // String Utilities
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

    // Form Validation Utilities
    isEmailValid(email) {
        if (typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isRequired(value) {
        if (value === undefined || value === null) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        return true;
    }

    isNumber(value) {
        if (typeof value === 'number') return !isNaN(value);
        if (typeof value === 'string') return !isNaN(Number(value)) && value.trim() !== '';
        return false;
    }

    isMinLength(value, min) {
        if (typeof value !== 'string') return false;
        return value.trim().length >= min;
    }

    isMaxLength(value, max) {
        if (typeof value !== 'string') return false;
        return value.trim().length <= max;
    }

    // New Form Validation Function
    validateForm(formId, validationRules) {
        const form = document.getElementById(formId);
        if (!form) throw new Error(`Form with ID "${formId}" not found`);

        const errors = {};
        let isValid = true;

        for (const [fieldName, rules] of Object.entries(validationRules)) {
            const field = form.elements[fieldName];
            if (!field) {
                errors[fieldName] = 'Field not found in form';
                isValid = false;
                continue;
            }

            const value = field.value;

            if (rules.required && !this.isRequired(value)) {
                errors[fieldName] = rules.requiredMessage || `${fieldName} is required`;
                isValid = false;
            }

            if (rules.email && !this.isEmailValid(value)) {
                errors[fieldName] = rules.emailMessage || `${fieldName} must be a valid email`;
                isValid = false;
            }

            if (rules.number && !this.isNumber(value)) {
                errors[fieldName] = rules.numberMessage || `${fieldName} must be a number`;
                isValid = false;
            }

            if (rules.minLength && !this.isMinLength(value, rules.minLength)) {
                errors[fieldName] = rules.minLengthMessage || `${fieldName} must be at least ${rules.minLength} characters`;
                isValid = false;
            }

            if (rules.maxLength && !this.isMaxLength(value, rules.maxLength)) {
                errors[fieldName] = rules.maxLengthMessage || `${fieldName} must not exceed ${rules.maxLength} characters`;
                isValid = false;
            }

            if (rules.custom && !rules.custom(value)) {
                errors[fieldName] = rules.customMessage || `${fieldName} failed custom validation`;
                isValid = false;
            }
        }

        return { isValid, errors };
    }

    // General Utilities
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        return JSON.parse(JSON.stringify(obj));
    }

    debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    generateRandomId(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

// Export for browser use
window.CommonUtils = CommonUtils;