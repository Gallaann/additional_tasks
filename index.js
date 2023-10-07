ROMAN_TO_ARABIC_TRANSITION = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
}

const romanToArabic = (roman) => {
    let result = 0;

    for (let i = 0; i < roman.length; i++) {
        if (ROMAN_TO_ARABIC_TRANSITION[roman[i]] < ROMAN_TO_ARABIC_TRANSITION[roman[i + 1]]) {
            result -= ROMAN_TO_ARABIC_TRANSITION[roman[i]];
        } else {
            result += ROMAN_TO_ARABIC_TRANSITION[roman[i]];
        }
    }

    return result;
}

const handler = {
    get: function(target, propertyName) {
        return romanToArabic(String(propertyName));
    }
};

Object.setPrototypeOf(Number.prototype, new Proxy({}, handler));
