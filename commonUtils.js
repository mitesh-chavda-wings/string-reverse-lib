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

    // Array Utilities
    shuffleArray(arr) {
        if (!Array.isArray(arr)) throw new Error('Input must be an array');
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    uniqueArray(arr) {
        if (!Array.isArray(arr)) throw new Error('Input must be an array');
        return [...new Set(arr)];
    }

    chunkArray(arr, size) {
        if (!Array.isArray(arr)) throw new Error('Input must be an array');
        if (typeof size !== 'number' || size <= 0) throw new Error('Size must be a positive number');
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }

    // Date/Time Utilities
    formatDate(date, format = 'YYYY-MM-DD') {
        if (!(date instanceof Date)) throw new Error('Input must be a Date object');
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

    timeAgo(date) {
        if (!(date instanceof Date)) throw new Error('Input must be a Date object');
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }

    // DOM Utilities
    toggleClass(el, className) {
        if (!(el instanceof Element)) throw new Error('Input must be a DOM element');
        el.classList.toggle(className);
    }

    setStyle(el, styles) {
        if (!(el instanceof Element)) throw new Error('Input must be a DOM element');
        if (typeof styles !== 'object' || styles === null) throw new Error('Styles must be an object');
        Object.assign(el.style, styles);
    }

    // Miscellaneous Utilities
    getQueryParams() {
        const params = {};
        new URLSearchParams(window.location.search).forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    truncateString(str, length) {
        if (typeof str !== 'string') throw new Error('Input must be a string');
        if (str.length <= length) return str;
        return str.slice(0, length) + '...';
    }

    slugify(str) {
        if (typeof str !== 'string') throw new Error('Input must be a string');
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
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
        if (inputType === 'file') return value.length > 0; // Check if files are selected
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

    // File Validation Utilities
    isFileSizeValid(files, maxSize) {
        if (!files || !files.length) return false;
        return Array.from(files).every(file => file.size <= maxSize);
    }

    isFileTypeValid(files, allowedTypes) {
        if (!files || !files.length || !allowedTypes || !allowedTypes.length) return false;
        return Array.from(files).every(file => allowedTypes.includes(file.type) || allowedTypes.includes(file.name.split('.').pop().toLowerCase()));
    }

    isFileCountValid(files, minCount = 1, maxCount = Infinity) {
        if (!files) return false;
        const count = files.length;
        return count >= minCount && count <= maxCount;
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

            let field, inputType, value;

            if (fields instanceof NodeList) {
                // Handle radio or checkbox groups
                const checkedField = Array.from(fields).find(f => f.checked);
                field = checkedField || fields[0];
                inputType = field.type;
                value = checkedField ? checkedField.value : '';
            } else {
                field = fields;
                inputType = field.type || field.tagName.toLowerCase();
                value = inputType === 'checkbox' || inputType === 'radio'
                    ? field.checked
                    : inputType === 'select-multiple'
                    ? Array.from(field.selectedOptions).map(option => option.value)
                    : inputType === 'file'
                    ? field.files
                    : field.value;
            }

            if (rules.required) {
                if (inputType === 'radio') {
                    const isAnyChecked = fields instanceof NodeList && Array.from(fields).some(f => f.checked);
                    if (!isAnyChecked) {
                        errors[fieldName] = rules.requiredMessage || `${fieldName} is required`;
                        isValid = false;
                    }
                } else if (!this.isRequired(value, inputType)) {
                    errors[fieldName] = rules.requiredMessage || `${fieldName} is required`;
                    isValid = false;
                }
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

            // File-specific validations
            if (inputType === 'file') {
                if (rules.maxSize && !this.isFileSizeValid(value, rules.maxSize)) {
                    errors[fieldName] = rules.maxSizeMessage || `${fieldName} exceeds maximum file size (${rules.maxSize} bytes)`;
                    isValid = false;
                }

                if (rules.allowedTypes && !this.isFileTypeValid(value, rules.allowedTypes)) {
                    errors[fieldName] = rules.allowedTypesMessage || `${fieldName} must be of type ${rules.allowedTypes.join(', ')}`;
                    isValid = false;
                }

                if (rules.fileCount && !this.isFileCountValid(value, rules.fileCount.min, rules.fileCount.max)) {
                    errors[fieldName] = rules.fileCountMessage || `${fieldName} must have between ${rules.fileCount.min} and ${rules.fileCount.max} files`;
                    isValid = false;
                }
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