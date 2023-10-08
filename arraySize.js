/**
 * `size` property for all arrays. Works the same way as the `length` property.
 * @name Array#size
 * @type {number}
 * @example
 * let arr = [1, 2, 3];
 * console.log(arr.size); // outputs: 3
 * arr.size = 1;
 * console.log(arr); // outputs: [1]
 */
Object.defineProperty(Array.prototype, 'size', {
    get: function() {
        return this.length;
    },
    set: function(value) {
        this.length = value;
    },
    enumerable: false,
    configurable: false
});
