function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    console.log(document.head.append(script));
  });
}

fetch("/article/promise-chaining/user.json") // Fetch JSON data from a local URL
  .then((response) => response.json()) // Parse the JSON response
  .then((user) => fetch(`https://api.github.com/users/${user.name}`)) // Fetch GitHub user data using the retrieved username
  .then((response) => response.json()) // Parse the JSON response
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        // Create a new promise to handle image loading
        // Create an image element with the GitHub user's avatar
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img); // Append the image to the document body

        // After 3 seconds, remove the image and resolve the promise with the GitHub user data
        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => alert(error.message)); // Handle any errors that occur during the promise chain
