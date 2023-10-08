/**
 * Custom implementation of the bind method.
 *
 * @function
 * @this {Function}
 * @param {any} thisArg - The value to be passed as the `this` parameter to the target function when the bound function is called.
 * @param {...any} argsBound - Arguments to prepend to arguments provided to the bound function.
 * @return {function} A copy of the given function with the specified `this` value and initial arguments.
 */
Function.prototype.customBind = function (thisArg, ...argsBound) {
    let originalFunction = this;
    return (...args) => {
        let context = Object.create(thisArg);
        context.originalFunction = originalFunction;
        return context.originalFunction(...argsBound, ...args);
    };
};
