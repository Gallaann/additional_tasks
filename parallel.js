/**
 * Executes tasks in parallel and collects results.
 *
 * @param {Array<function>} tasks - An array of functions to be executed in parallel. Each function should either be synchronous or asynchronous with a single callback argument.
 * @param {function} done - A callback function that is invoked after all tasks have completed. It takes an array of results as its only argument.
 *
 * @throws {Error} Will throw an error if tasks is not an array.
 * @throws {Error} Will throw an error if done is not a function.
 * @throws {Error} Will throw an error if tasks array is empty.
 * @throws {Error} Will throw an error if a task is not a function.
 */
function parallel(tasks, done) {
    if (!Array.isArray(tasks)) {
        throw new Error('Expected tasks to be an array');
    }

    if (typeof done !== 'function') {
        throw new Error('Expected done to be a function');
    }

    let results = [];
    let pending = tasks.length;

    if (pending === 0) {
        throw new Error('Tasks array should not be empty');
    }

    tasks.forEach(function (task, i) {
        if (typeof task !== 'function') {
            throw new Error('Expected task to be a function');
        }

        if (task.length === 1) {
            task(function (result) {
                results[i] = result;
                pending -= 1;
                if (pending === 0) {
                    done(results);
                }
            });
        } else {
            results[i] = task();
            pending -= 1;
            if (pending === 0) {
                done(results);
            }
        }
    });
}
