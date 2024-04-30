# Promise

## A Promise object serves as a link between the executor (the “producing code” or “singer”) and the consuming functions (the “fans”), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods .then and .catch.

## A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.

## A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.

## A promise is a special JavaScript object that links the “producing code” and the “consuming code” together. In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.

### syntax for a promise object is:\

```js
let promise = new Promise(function (resolve, reject) {
  // executor (the producing code, "singer")
});
```

## the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls resolve if it was successful or reject if there was an error.

## There can be only a single result or an error

### The executor should call only one resolve or one reject. Any state change is final.

### All further calls of resolve and reject are ignored:

### example

```js let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

## a job done by the executor may have only one result or an error. resolve/reject expect only one argument (or none) and will ignore additional arguments.

# Consumers: then, catch

## Consuming functions can be registered (subscribed) using the methods .then and .cat

# then

### example\

```js
promise.then(
  function (result) {
    /* handle a successful result */
  },
  function (error) {
    /* handle an error */
  }
);
```

## The first argument of .then is a function that runs when the promise is resolved and receives the result.

## The second argument of .then is a function that runs when the promise is rejected and receives the error.

## resolved example

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  (result) => alert(result), // shows "done!" after 1 second
  (error) => alert(error) // doesn't run
);
// The first function was executed.
//  And in the case of a rejection, the second one:
```

# catch

## If we’re interested only in errors, then we can use null as the first argument: .then(null, errorHandlingFunction). Or we can use .catch(errorHandlingFunction), which is exactly the same:

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
```

# finally

## Just like there’s a finally clause in a regular try {...} catch {...}, there’s finally in promises.

## The idea of finally is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

```js
new Promise((resolve, reject) => {
 /* do something that takes time, and then call resolve or maybe reject */
})
 // runs when the promise is settled, doesn't matter successfully or not
 .finally(() => stop loading indicator)
 // so the loading indicator is always stopped before we go on
 .then(result => show result, err => show error)
```

### 1. in above code A finally handler has no arguments. In finally we don’t know whether the promise is successful or not. That’s all right, as our task is usually to perform “general” finalizing procedures.

### 2. A finally handler “passes through” the result or error to the next suitable handler.

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => alert("Promise ready")) // triggers first
  .then((result) => alert(result)); // <-- .then shows "value"
```

## A finally handler also shouldn’t return anything. If it does, the returned value is silently ignored.

### when a finally handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

## diffrence between promise and call back

## Promises: Promises allow us to do things in the natural order. First, we run loadScript(script), and .then we write what to do with the result.

## Callback: sWe must have a callback function at our disposal when calling loadScript(script, callback). In other words, we must know what to do with the result before loadScript is called.

## Promises: We can call .then on a Promise as many times as we want. Each time, we’re adding a new “fan”, a new subscribing function, to the “subscription list”. More about this in the next chapter: Promises chaining.

## Callback: There can be only one callback.

# Error handling with promises

### Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handle
