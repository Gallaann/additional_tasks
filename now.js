/**
 * A regular expression to match the input string for the time calculation.
 *
 * @type {RegExp}
 */
const INPUT_REGEX = /([+-])\s*(\d+(?:\.\d+)?)\s*(ms|s|sec|m|min|h|hours|d|days|w|weeks|mo|months|y|years)/;

/**
 * Function to calculate a timestamp based on the current time and an optional input string.
 * The input string can adjust the timestamp by a certain number of milliseconds, seconds, minutes,
 * hours, days, weeks, months, or years.
 *
 * @function
 * @param {string} [input=null] - A string to adjust the timestamp. (optional)
 * @returns {number} The calculated timestamp in milliseconds since the Unix Epoch.
 *
 * @example
 * // returns a timestamp 1 hour in the future
 * now('+ 1 hours');
 */
now = (input = null) => {
    let timestamp = Date.now();

    if (input) {
        const inputDivided = input.match(INPUT_REGEX);

        if (inputDivided) {
            const sign = inputDivided[1] === '+' ? 1 : -1;
            const value = parseInt(inputDivided[2], 10);
            const unit = inputDivided[3];

            let date = new Date(timestamp);
            switch (unit) {
                case 'ms':
                    date = new Date(timestamp + sign * value);
                    break;
                case 's':
                case 'sec':
                    date = new Date(timestamp + sign * value * 1000);
                    break;
                case 'm':
                case 'min':
                    date = new Date(timestamp + sign * value * 1000 * 60);
                    break;
                case 'h':
                case 'hours':
                    date = new Date(timestamp + sign * value * 1000 * 60 * 60);
                    break;
                case 'd':
                case 'days':
                    date = new Date(timestamp + sign * value * 1000 * 60 * 60 * 24);
                    break;
                case 'w':
                case 'weeks':
                    date = new Date(timestamp + sign * value * 1000 * 60 * 60 * 24 * 7);
                    break;
                case 'mo':
                case 'months':
                    date.setMonth(date.getMonth() + sign * value);
                    break;
                case 'y':
                case 'years':
                    date.setFullYear(date.getFullYear() + sign * value);
                    break;
            }

            timestamp = date.getTime();
        }
    }

    return timestamp;
}
