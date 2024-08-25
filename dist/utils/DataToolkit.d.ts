export declare class DataToolkit {
    static mergeObjects<T>(obj1: T, obj2: Partial<T>): T;
    static deepMerge<T>(target: T, source: Partial<T>): T;
    static getValue<T, K extends keyof T>(obj: T, key: K): T[K] | undefined;
    static setValue<T, K extends keyof T>(obj: T, key: K, value: T[K]): void;
    static removeProperty<T, K extends keyof T>(obj: T, key: K): void;
    static findInArray<T>(arr: T[], predicate: (item: T) => boolean): T | undefined;
    static filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[];
    static sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
    static addUnique<T>(arr: T[], item: T): void;
    static removeItem<T>(arr: T[], item: T): void;
    static getArrayDifference<T>(arr1: T[], arr2: T[]): T[];
    static getArrayUnion<T>(arr1: T[], arr2: T[]): T[];
    static isDefined(value: any): boolean;
    static isNonEmptyString(value: any): boolean;
    static isEmpty(value: any): boolean;
    static flattenObject<T>(obj: T, prefix?: string): Record<string, any>;
    static deepClone<T>(obj: T): T;
    static getObjectKeys<T>(obj: T, prefix?: string): string[];
    static removeNullUndefined<T>(obj: T): T;
    static getUniqueValues<T>(arr: T[]): T[];
    static chunkArray<T>(arr: T[], size: number): T[][];
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
    static throttle<F extends (...args: any[]) => void>(func: F, limit: number): F;
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
    static countOccurrences<T>(arr: T[]): Record<string, number>;
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
    static shuffleArray<T>(arr: T[]): T[];
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
    static getSafeValue<T, K extends keyof T>(obj: T, key: K): T[K] | undefined;
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
    static generateUUID(): string;
}
