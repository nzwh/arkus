//- @func: wraps an async function to handle errors
//  @param: [fn: (...args: T) => Promise<void>] - the async function to wrap
//  @returns: [(...args: T) => void] - a new function that executes the async function and catches errors
export default function AsyncHandler<T extends unknown[]>(
    fn: (...args: T) => Promise<void>
): (...args: T) => void {

    return (...args: T) => {
        fn(...args).catch(error => {
            console.error(' [🚧] Error in async handler:', error);
        });
    };

}