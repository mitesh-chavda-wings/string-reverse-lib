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

    isRequired(value, inputType = 'text') {
        if (value === undefined || value === null) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (inputType === 'checkbox' || inputType === 'radio') return !!value;
        if (inputType === 'select-one' || inputType === 'select-multiple') return value.length > 0;
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

    isMinValue(value, min) {
        const num = Number(value);
        return !isNaN(num) && num >= min;
    }

    isMaxValue(value, max) {
        const num = Number(value);
        return !isNaN(num) && num <= max;
    }

    isPattern(value, pattern) {
        if (typeof value !== 'string' || !pattern) return false;
        const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
        return regex.test(value);
    }

    isChecked(field) {
        return field.checked === true;
    }

    isSelected(value, options = []) {
        if (Array.isArray(value)) return value.length > 0 && value.every(val => options.includes(val));
        return options.includes(value);
    }

    // Enhanced Form Validation Function
    validateForm(formId, validationRules) {
        const form = document.getElementById(formId);
        if (!form) throw new Error(`Form with ID "${formId}" not found`);

        const errors = {};
        let isValid = true;

        for (const [fieldName, rules] of Object.entries(validationRules)) {
            const fields = form.elements[fieldName];
            if (!fields) {
                errors[fieldName] = 'Field not found in form';
                isValid = false;
                continue;
            }

            // Handle single element or NodeList (e.g., radio buttons)
            let field = fields;
            let inputType;
            let value;

            if (fields instanceof NodeList) {
                // For radio or checkbox groups
                field = Array.from(fields).find(f => f.checked) || fields[0]; // Use checked or first element
                inputType = field ? field.type : 'radio'; // Default to 'radio' if no checked
                value = field ? field.value : '';
            } else {
                // Single input (text, select, etc.)
                inputType = field.type || field.tagName.toLowerCase();
                value = inputType === 'checkbox' || inputType === 'radio'
                    ? field.checked
                    : inputType === 'select-multiple'
                    ? Array.from(field.selectedOptions).map(option => option.value)
                    : field.value;
            }

            if (rules.required && !this.isRequired(value, inputType)) {
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

            if (rules.minValue && !this.isMinValue(value, rules.minValue)) {
                errors[fieldName] = rules.minValueMessage || `${fieldName} must be at least ${rules.minValue}`;
                isValid = false;
            }

            if (rules.maxValue && !this.isMaxValue(value, rules.maxValue)) {
                errors[fieldName] = rules.maxValueMessage || `${fieldName} must not exceed ${rules.maxValue}`;
                isValid = false;
            }

            if (rules.pattern && !this.isPattern(value, rules.pattern)) {
                errors[fieldName] = rules.patternMessage || `${fieldName} does not match the required pattern`;
                isValid = false;
            }

            if (rules.checked && !this.isChecked(field)) {
                errors[fieldName] = rules.checkedMessage || `${fieldName} must be checked`;
                isValid = false;
            }

            if (rules.options && !this.isSelected(value, rules.options)) {
                errors[fieldName] = rules.optionsMessage || `${fieldName} must be a valid selection`;
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

    // UI and Form Helpers
    clearErrors() {
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
    }

    displayErrors(errors) {
        for (const [fieldName, message] of Object.entries(errors)) {
            const errorElement = document.getElementById(`${fieldName}-error`);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
        }
    }

    getFormData(formOrId) {
        const form = typeof formOrId === 'string' ? document.getElementById(formOrId) : formOrId;
        if (!form || !(form instanceof HTMLFormElement)) throw new Error('Invalid form');
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }
}

// Export for browser use
window.CommonUtils = CommonUtils;