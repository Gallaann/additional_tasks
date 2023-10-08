/**
 * A mapping of Roman numerals to Arabic numerals.
 *
 * @type {Object.<string, number>}
 * @const
 */
const ROMAN_TO_ARABIC_TRANSITION = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
};

/**
 * A regular expression for validating Roman numerals.
 *
 * @type {RegExp}
 * @const
 */
const ROMAN_REGEX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

/**
 * Converts a Roman numeral to an Arabic numeral.
 * Returns NaN if the input is not a valid Roman numeral.
 *
 * @param {string} roman - The Roman numeral to convert.
 * @returns {number} The converted Arabic numeral.
 */
const romanToArabic = (roman) => {
    if (!ROMAN_REGEX.test(roman)) {
        return NaN;
    }

    let result = 0;
    let i = 0;

    while (i < roman.length) {
        if (ROMAN_TO_ARABIC_TRANSITION[roman[i] + roman[i + 1]]) {
            result += ROMAN_TO_ARABIC_TRANSITION[roman[i] + roman[i + 1]];
            i += 2;
        } else {
            result += ROMAN_TO_ARABIC_TRANSITION[roman[i]];
            i++;
        }
    }

    return result;
}

/**
 * Creates an array with a specified length.
 * Returns undefined if the input is not a number.
 *
 * @param {number} length - The length of the array to create.
 * @returns {Array<number>|undefined} The created array.
 */
const createArray = (length) => {
    if (isNaN(length)) {
        return undefined
    }

    return Array.from({length: length}, (_, i) => i);
}

/**
 * A handler for creating arrays with a proxy.
 * @type {Object}
 */
const handler = {
    get: function (target, propertyName) {
        return createArray(romanToArabic(propertyName));
    }
};

/**
 * Modifies the Number prototype to support creating arrays using Roman numerals.
 *
 * @example
 * console.log(0..V); // outputs: [0, 1, 2, 3, 4]
 * @example
 * const number = 0;
 * console.log(number.V); // outputs: [0, 1, 2, 3, 4]
 */
Object.setPrototypeOf(Number.prototype, new Proxy({}, handler));
