# callbacks

## Many functions are provided by JavaScript host environments that allow you to schedule asynchronous actions. In other words, actions that we initiate now, but they finish later.

## function that does something asynchronously should provide a callback argument where we put the function to run after it’s complete.

##

## We can use this function like this:

```js
loadScript("/my/script.js");
```

## the above The script is executed “asynchronously”, as it starts loading now, but runs later, when the function has already finished.

# Callback in callback

## How can we load two scripts sequentially: the first one, and then the second one after it?

```js
loadScript("/my/script.js", function (script) {
  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript("/my/script2.js", function (script) {
    alert(`Cool, the second script is loaded`);
  });
});
```

## After the outer loadScript is complete, the callback initiates the inner one.

# Handling errors

## What if the script loading fails? Our callback should be able to react on that.

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```
