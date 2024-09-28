export class DataToolkit {

    // Method to merge two objects
    static mergeObjects<T>(obj1: T, obj2: Partial<T>): T {
        return { ...obj1, ...obj2 };
    }

    // Method to deeply merge two objects
    static deepMerge<T>(target: T, source: Partial<T>): T {
        for (const key in source) {
            if (source[key] instanceof Object && target[key] instanceof Object) {
                DataToolkit.deepMerge(target[key], source[key] as any);
            } else {
                target[key] = source[key] as any;
            }
        }
        return target;
    }

    // Method to get a value from an object safely
    static getValue<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
        return obj[key];
    }

    // Method to set a value in an object
    static setValue<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
        obj[key] = value;
    }

    // Method to remove a property from an object
    static removeProperty<T, K extends keyof T>(obj: T, key: K): void {
        delete obj[key];
    }

    // Method to find an item in an array
    static findInArray<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
        return arr.find(predicate);
    }

    // Method to filter an array based on a predicate
    static filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
        return arr.filter(predicate);
    }

    // Method to sort an array
    static sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
        return arr.slice().sort(compareFn);
    }

    // Method to add an item to an array if it doesn't already exist
    static addUnique<T>(arr: T[], item: T): void {
        if (!arr.includes(item)) {
            arr.push(item);
        }
    }

    // Method to remove an item from an array
    static removeItem<T>(arr: T[], item: T): void {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    // Method to get the difference between two arrays
    static getArrayDifference<T>(arr1: T[], arr2: T[]): T[] {
        return arr1.filter(item => !arr2.includes(item));
    }

    // Method to get the union of two arrays
    static getArrayUnion<T>(arr1: T[], arr2: T[]): T[] {
        return [...new Set([...arr1, ...arr2])];
    }

    // Method to check if a variable is defined
    static isDefined(value: any): boolean {
        return value !== undefined && value !== null;
    }

    // Method to check if a variable is a non-empty string
    static isNonEmptyString(value: any): boolean {
        return typeof value === 'string' && value.trim().length > 0;
    }

    // Method to check if a variable (array or object) is empty
    static isEmpty(value: any): boolean {
        if (Array.isArray(value)) {
            return value.length === 0; // Check if array is empty
        } else if (value instanceof Object && value !== null) {
            return Object.keys(value).length === 0; // Check if object has no keys
        }
        return !value; // For other types, treat falsy values as empty
    }

    static flattenObject<T>(obj: T, prefix: string = ''): Record<string, any> {
        let result: Record<string, any> = {};

        for (const key in obj) {
            if (obj[key] instanceof Object && !Array.isArray(obj[key]) && obj[key] !== null) {
                Object.assign(result, DataToolkit.flattenObject(obj[key], `${prefix}${key}.`));
            } else {
                result[`${prefix}${key}`] = obj[key];
            }
        }

        return result;
    }

    static deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T;
    }

    static getObjectKeys<T>(obj: T, prefix: string = ''): string[] {
        let keys: string[] = [];

        for (const key in obj) {
            if (obj[key] instanceof Object && !Array.isArray(obj[key]) && obj[key] !== null) {
                keys = keys.concat(DataToolkit.getObjectKeys(obj[key], `${prefix}${key}.`));
            } else {
                keys.push(`${prefix}${key}`);
            }
        }

        return keys;
    }

    static removeNullUndefined<T>(obj: T): T {
        let result = { ...obj };

        for (const key in result) {
            if (result[key] === null || result[key] === undefined) {
                delete result[key];
            } else if (result[key] instanceof Object && !Array.isArray(result[key])) {
                result[key] = DataToolkit.removeNullUndefined(result[key]);
            }
        }

        return result as T;
    }

    static getUniqueValues<T>(arr: T[]): T[] {
        return Array.from(new Set(arr));
    }

    static chunkArray<T>(arr: T[], size: number): T[][] {
        const result: T[][] = [];
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
    static throttle<F extends (...args: any[]) => void>(func: F, limit: number): F {
        let inThrottle: boolean;
        return function (this: any, ...args: any[]) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        } as F;
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
    static countOccurrences<T>(arr: T[]): Record<string, number> {
        return arr.reduce((acc: Record<string, number>, item: T) => {
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
    static shuffleArray<T>(arr: T[]): T[] {
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
    static getSafeValue<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
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
    static generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Convert a string first letter to capital
    static firstLetterCapital = (str: string): string => {
        const arr: string[] = str.split(" ");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
    };

    // Convert a string to TitleCase
    static toTitleCase = (str: string = ''): string => {
        const arr: string[] = str.split(' ');
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
        }
        return arr.join(' ');
    };

    // Convert a string to PascalCase
    static toPascalCase = (str: string): string => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
    };

    // Convert a string to camelCase
    static toCamelCase = (str: string): string => {
        const words = str.split(" ");
        return words[0].toLowerCase() + words
            .slice(1)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
    };

    // Convert a string to snake_case
    static toSnakeCase = (str: string): string => {
        return str
            .split(" ")
            .map(word => word.toLowerCase())
            .join("_");
    };

}
