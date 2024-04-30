## Promises chaining

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)

    alert(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)

    alert(result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 4
    return result * 2;
  });
```

## The initial promise resolves in 1 second (\*),

## the .then handler is called (\*\*), which in turn creates a new promise (resolved with 2 value).

## The next then (\*\*\*) gets the result of the previous one, processes it (doubles) and passes it to the next handler.

# Returning promises

## A handler, used in .then(handler) may create and return a promise.

## In that case further handlers wait until it settles, and then get its result.

### example

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    alert(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4
  });
```

## the first .then shows 1 and returns new Promise(…)

## After one second it resolves, and the result is passed on to the handler of the second .then. That handler is in the line (\*\*), it shows 2 and does the same thing.

# fetch

## In frontend programming, promises are often used for network requests.

## fetch method to loads the information about the user from the remote server.

## example

```js
let promise = fetch(url);
```

## The code below makes a request to user.json and loads its text from the server

```js
fetch("/article/promise-chaining/user.json")
  // .then below runs when the remote server responds
  .then(function (response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function (text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

## Error handling with promises

## Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler.

## Implicit try…catch

## The code of a promise executor and promise handlers has an "invisible try..catch" around it. If an exception happens, it gets caught and treated as a rejection.

## example

```js
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```

## The "invisible try..catch" around the executor automatically catches the error and turns it into rejected promise.

## Rethrowing

## .catch at the end of the chain is similar to try..catch. We may have as many .then handlers as we want, and then use a single .catch at the end to handle errors in all of them.

## In a regular try..catch we can analyze the error and maybe rethrow it if it can’t be handled. The same thing is possible for promises.

## example

```js
// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("The error is handled, continue normally");
  })
  .then(() => alert("Next successful handler runs"));
```

## The .catch block finishes normally. So the next successful .then handler is called

# Here the .catch block finishes normally. So the next successful .then handler is called

## In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets “stuck”. There’s no code to handle it.

## .catch handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.

## .then also catches errors in the same manner, if given the second argument (which is the error handler).

## We should place .catch exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).

## It’s ok not to use .catch at all, if there’s no way to recover from an error.

## In any case we should have the unhandledrejection event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.
