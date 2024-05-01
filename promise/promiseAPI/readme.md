# Promise API

## There are 6 static methods in the Promise class.

### Promise.all

##### Promise.all takes an iterable (usually, an array of promises) and returns a new promise.

#### The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

```js
let promise = Promise.all(iterable);
```

### the Promise.all below settles after 3 seconds, and then its result is an array [1, 2, 3]:

```js
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 1,2,3 when promises are ready: each promise
```

### If one promise rejects, Promise.all immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: Whoops!
```

#### For example, if there are multiple fetch calls, like in the example above, and one fails, the others will still continue to execute, but Promise.all won’t watch them anymore. They will probably settle, but their results will be ignored.

## Promise.allSettled

## Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:

## {status:"fulfilled", value:result} for successful responses,

## {status:"rejected", reason:error} for errors.

### fetch the information about multiple users. Even if one request fails, we’re still interested in the others.

```js
let urls = [
 'https://api.github.com/users/iliakan',
 'https://api.github.com/users/remy',
 'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
 .then(results => { // (*)
   results.forEach((result, num) => {
     if (result.status == "fulfilled") {
       alert(`${urls[num]}: ${result.value.status}`);
     }
     if (result.status == "rejected") {
       alert(`${urls[num]}: ${result.reason}`);
     }
   });
 });
//   result will be
 [
 {status: 'fulfilled', value: ...response...},
 {status: 'fulfilled', value: ...response...},
 {status: 'rejected', reason: ...error object...}
]

```

## Polyfill

### If the browser doesn’t support Promise.allSettled, it’s easy to polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = (reason) => ({ status: "rejected", reason });

  const resolveHandler = (value) => ({ status: "fulfilled", value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map((p) =>
      Promise.resolve(p).then(resolveHandler, rejectHandler)
    );
    return Promise.all(convertedPromises);
  };
}
```

## promises.map takes input values, turns them into promises (just in case a non-promise was passed) with p => Promise.resolve(p), and then adds .then handler to every one.

## That handler turns a successful result value into {status:'fulfilled', value}, and an error reason into {status:'rejected', reason}. That’s exactly the format of Promise.allSettled.

## Now we can use Promise.allSettled to get the results of all given promises, even if some of them reject.

## Promise.race

### Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

## example

```js
let promise = Promise.race(iterable);
```

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

## The first promise here was fastest, so it became the result. After the first settled promise “wins the race”, all further results/errors are ignored.

## Promise.any

## waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with AggregateError – a special error object that stores all promise errors in its errors property

## example

```js
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

#### The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise “wins the race”, all further results are ignored.\

## Promise.resolve/reject

### Methods Promise.resolve and Promise.reject are rarely needed in modern code, because async/await syntax (we’ll cover it a bit later) makes them somewhat obsolete.

## Promise.all(promises) – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.

## Promise.allSettled(promises) (recently added method) – waits for all promises to settle and returns their results as an array of objects with:

### status: "fulfilled" or "rejected"

### value (if fulfilled) or reason (if rejected).

## Promise.race(promises) – waits for the first promise to settle, and its result/error becomes the outcome.

### Promise.any

## (promises) (recently added method) – waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, AggregateError becomes the error of Promise.any.

## Promise.resolve(value) – makes a resolved promise with the given value.

## Promise.reject(error) – makes a rejected promise with the given error.

## Of all these, Promise.all is probably the most common in practice.
