let promise = new Promise(function (resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);

//  The built-in function setTimeout uses callbacks. Create a promise-based alternative.

// The function delay(ms) should return a promise. That promise should resolve after ms milliseconds, so that we can add .then to it, like this:

// function delay(ms) {
//     // your code
//   }

//   delay(3000).then(() => alert('runs after 3 seconds'));
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => alert("runs after 3 seconds"));
