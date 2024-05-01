# Promisification

## Promisification” is a long word for a simple transformation. It’s the conversion of a function that accepts a callback into a function that returns a promise.

## So promisification is only meant for functions that call the callback once. Further calls will be ignored.

## Promisification is a great approach, especially when you use async/await

## When called as promisify(f, true), it should return the promise that resolves with the array of callback results. That’s exactly for callbacks with many arguments.

```js
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

### resolve is called with only one or all arguments depending on whether manyArgs is truthy.

# Microtasks

## Promise handlers .then/.catch/.finally are always asynchronous.v

```js let promise = Promise.resolve();
promise.then(() => alert("promise done!"));

alert("code finished"); // this alert shows first
```

### when a promise is ready, its .then/catch/finally handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.

### If there’s a chain with multiple .then/catch/finally, then every one of them is executed asynchronously. That is, it first gets queued, then executed when the current code is complete and previously queued handlers are finished.

## Unhandled rejection

### An “unhandled rejection” occurs when a promise error is not handled at the end of the microtask queue.

### if we expect an error, we add .catch to the promise chain to handle it:

```js
let promise = Promise.reject(new Error("Promise Failed!"));
promise.catch(err => alert('caught'));

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));\
```

### But if we forget to add .catch, then, after the microtask queue is empty, the engine triggers the event

```js
let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener("unhandledrejection", (event) => alert(event.reason));
```

### unhandledrejection is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the “rejected” state, then the event triggers.
