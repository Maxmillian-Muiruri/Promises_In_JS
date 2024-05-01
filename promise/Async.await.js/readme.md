## Async/await

## Async functions

## EXAMPLE

```js
async function f() {
  return 1;
}
```

## The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

## Await

### syntax:

```js
// works only inside async function
let value = await promise;
```

## The keyword await makes JavaScript wait until that promise settles and returns its result.

### await literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn’t cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```

### await only works inside an async function

## Error handling

## If a promise resolves normally, then await promise returns the result. But in the case of a rejection, it throws the error, just as if there were a throw statement at that lin

```js
async function f() {
  throw new Error("Whoops!");
}
```

## In real situations, the promise may take some time before it rejects. In that case there will be a delay before await throws an error.

## We can catch that error using try..catch, the same way as a regular throw:

### the control jumps to the catch block.

## We can also wrap multiple lines:

```js
async function f() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

## async/await works well with Promise.all

## When we need to wait for multiple promises, we can wrap them in Promise.all and then await:

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

### In case of an error, it propagates as usual, from the failed promise to Promise.all, and then becomes an exception that we can catch using try..catch around the call.
