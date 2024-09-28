"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataToolkit = void 0;
class DataToolkit {
    // Method to merge two objects
    static mergeObjects(obj1, obj2) {
        return Object.assign(Object.assign({}, obj1), obj2);
    }
    // Method to deeply merge two objects
    static deepMerge(target, source) {
        for (const key in source) {
            if (source[key] instanceof Object && target[key] instanceof Object) {
                DataToolkit.deepMerge(target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
        return target;
    }
    // Method to get a value from an object safely
    static getValue(obj, key) {
        return obj[key];
    }
    // Method to set a value in an object
    static setValue(obj, key, value) {
        obj[key] = value;
    }
    // Method to remove a property from an object
    static removeProperty(obj, key) {
        delete obj[key];
    }
    // Method to find an item in an array
    static findInArray(arr, predicate) {
        return arr.find(predicate);
    }
    // Method to filter an array based on a predicate
    static filterArray(arr, predicate) {
        return arr.filter(predicate);
    }
    // Method to sort an array
    static sortArray(arr, compareFn) {
        return arr.slice().sort(compareFn);
    }
    // Method to add an item to an array if it doesn't already exist
    static addUnique(arr, item) {
        if (!arr.includes(item)) {
            arr.push(item);
        }
    }
    // Method to remove an item from an array
    static removeItem(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
    // Method to get the difference between two arrays
    static getArrayDifference(arr1, arr2) {
        return arr1.filter(item => !arr2.includes(item));
    }
    // Method to get the union of two arrays
    static getArrayUnion(arr1, arr2) {
        return [...new Set([...arr1, ...arr2])];
    }
    // Method to check if a variable is defined
    static isDefined(value) {
        return value !== undefined && value !== null;
    }
    // Method to check if a variable is a non-empty string
    static isNonEmptyString(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }
    // Method to check if a variable (array or object) is empty
    static isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0; // Check if array is empty
        }
        else if (value instanceof Object && value !== null) {
            return Object.keys(value).length === 0; // Check if object has no keys
        }
        return !value; // For other types, treat falsy values as empty
    }
    static flattenObject(obj, prefix = '') {
        let result = {};
        for (const key in obj) {
            if (obj[key] instanceof Object && !Array.isArray(obj[key]) && obj[key] !== null) {
                Object.assign(result, DataToolkit.flattenObject(obj[key], `${prefix}${key}.`));
            }
            else {
                result[`${prefix}${key}`] = obj[key];
            }
        }
        return result;
    }
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    static getObjectKeys(obj, prefix = '') {
        let keys = [];
        for (const key in obj) {
            if (obj[key] instanceof Object && !Array.isArray(obj[key]) && obj[key] !== null) {
                keys = keys.concat(DataToolkit.getObjectKeys(obj[key], `${prefix}${key}.`));
            }
            else {
                keys.push(`${prefix}${key}`);
            }
        }
        return keys;
    }
    static removeNullUndefined(obj) {
        let result = Object.assign({}, obj);
        for (const key in result) {
            if (result[key] === null || result[key] === undefined) {
                delete result[key];
            }
            else if (result[key] instanceof Object && !Array.isArray(result[key])) {
                result[key] = DataToolkit.removeNullUndefined(result[key]);
            }
        }
        return result;
    }
    static getUniqueValues(arr) {
        return Array.from(new Set(arr));
    }
    static chunkArray(arr, size) {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }
    // TODO:
    // static debounce<F extends (...args: any[]) => void>(func: F, wait: number): F {
    //     let timeout: NodeJS.Timeout | null = null;
    //     return function (this: any, ...args: any[]) {
    //         if (timeout) {
    //             clearTimeout(timeout);
    //         }
    //         timeout = setTimeout(() => func.apply(this, args), wait);
    //     } as F;
    // }
    /**
 * Throttles a function to ensure it is not called more frequently than a specified limit.
 *
 * This function creates a wrapper around the provided function, which will only allow the original function to be called once every `limit` milliseconds.
 * If the throttled function is called multiple times within the specified limit, only the first call will be executed, and subsequent calls will be ignored.
 *
 * @template F - The type of the function to be throttled.
 *
 * @param func - The function to be throttled.
 * @param limit - The minimum time (in milliseconds) that must pass between each call to the throttled function.
 *
 * @returns A new function that is a throttled version of the original function.
 *
 * @example
 * const throttledFunction = DataToolkit.throttle(() => console.log('Hello, World!'), 1000);
 *
 * // The following calls will only execute the original function once every 1000 milliseconds.
 * throttledFunction();
 * throttledFunction();
 * throttledFunction();
 */
    static throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    /**
 * Counts the occurrences of each element in an array and returns a map of element to count.
 *
 * This function takes an array of elements and returns a map where each key is a unique element from the input array,
 * and the corresponding value is the number of occurrences of that element in the array.
 *
 * @template T - The type of elements in the array.
 *
 * @param arr - The input array.
 *
 * @returns A map (Record) where the keys are the unique elements from the input array,
 * and the values are the counts of each element.
 *
 * @example
 * const numbers = [1, 2, 3, 2, 1, 4, 3, 3];
 * const occurrences = DataToolkit.countOccurrences(numbers);
 * console.log(occurrences); // Output: { '1': 2, '2': 2, '3': 3, '4': 1 }
 */
    static countOccurrences(arr) {
        return arr.reduce((acc, item) => {
            const key = String(item);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    }
    /**
 * Shuffles the elements of an array in a random order.
 *
 * This function creates a copy of the input array, then sorts the copy using a random comparison function.
 * The random comparison function generates values between -0.5 and 0.5, which causes the sort order to be random.
 *
 * @template T - The type of elements in the array.
 *
 * @param arr - The array to shuffle.
 *
 * @returns A new array containing the shuffled elements.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = DataToolkit.shuffleArray(numbers);
 * console.log(shuffledNumbers); // Output: [3, 5, 1, 4, 2] (random order)
 */
    static shuffleArray(arr) {
        return arr.slice().sort(() => Math.random() - 0.5);
    }
    /**
 * Safely retrieves a value from an object using a given key.
 *
 * This function is designed to handle cases where the object may not contain the specified key,
 * or the value associated with the key may be `undefined`. It returns the value if it exists,
 * or `undefined` if either the key is not present in the object or the value is `undefined`.
 *
 * @template T - The type of the object.
 * @template K - The type of the key, which must be a key of `T`.
 *
 * @param obj - The object from which to retrieve the value.
 * @param key - The key of the value to retrieve.
 *
 * @returns The value associated with the given key, or `undefined` if the key is not present or the value is `undefined`.
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * const name = DataToolkit.getSafeValue(obj, 'name'); // name will be 'John'
 * const address = DataToolkit.getSafeValue(obj, 'address'); // address will be undefined
 */
    static getSafeValue(obj, key) {
        return obj[key];
    }
    /**
 * Generates a universally unique identifier (UUID) in the standard format.
 *
 * UUIDs are used to uniquely identify information in computer systems.
 * They are generated using a combination of random numbers and time-based values.
 *
 * @returns {string} A string representing a UUID in the format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".
 *
 * @example
 * const uuid = DataToolkit.generateUUID();
 * console.log(uuid); // Output: "123e4567-e89b-12d3-a456-426614174000"
 */
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.DataToolkit = DataToolkit;
// Convert a string first letter to capital
DataToolkit.firstLetterCapital = (str) => {
    const arr = str.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
};
// Convert a string to TitleCase
DataToolkit.toTitleCase = (str = '') => {
    const arr = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
};
// Convert a string to PascalCase
DataToolkit.toPascalCase = (str) => {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
};
// Convert a string to camelCase
DataToolkit.toCamelCase = (str) => {
    const words = str.split(" ");
    return words[0].toLowerCase() + words
        .slice(1)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
};
// Convert a string to snake_case
DataToolkit.toSnakeCase = (str) => {
    return str
        .split(" ")
        .map(word => word.toLowerCase())
        .join("_");
};
