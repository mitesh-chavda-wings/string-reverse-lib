# String Reverse Library
A simple JavaScript library to reverse strings.
## Deployment steps
================
1) create a github repository with your custom functions.
2) npm install -g uglify-js
3) uglifyjs stringReverse.js -o stringReverse.min.js
4) git add stringReverse.js stringReverse.min.js
5) git commit -m "Add countString function to stringReverse.js"
6) git push

Example your cdn url :- https://cdn.jsdelivr.net/gh/mitesh-chavda-wings/string-reverse-lib@latest/stringReverse.js

For versioning steps
====================
git tag 1.0.1
git push origin 1.0.1

after your tag and versioning

Example your cdn url :- https://cdn.jsdelivr.net/gh/mitesh-chavda-wings/string-reverse-lib@1.0.1/stringReverse.min.js

## Usage
```html
<script src="https://cdn.jsdelivr.net/gh/mitesh-chavda-wings/string-reverse-lib@1.0.1/stringReverse.min.js"></script>
<script>
    console.log(reverseString("Hello")); // Should log "olleH"
    console.log(countString("Hello")); // Should log 5
</script>

Array Utilities
   * shuffleArray(arr): Randomly shuffles the elements of an array.
   * uniqueArray(arr): Creates an array with only the unique values from an existing array.
   * chunkArray(arr, size): Splits an array into smaller arrays of a specified size.

  Date/Time Utilities
   * formatDate(date, format): Formats a date object into a string with a specified format (e.g., 'YYYY-MM-DD').
   * timeAgo(date): Generates a human-readable string that represents how long ago a date was (e.g., "2 hours ago").

  DOM Utilities
   * toggleClass(el, className): Toggles a class on a given DOM element.
   * setStyle(el, styles): Applies multiple CSS styles to a DOM element at once.

  Miscellaneous Utilities
   * getQueryParams(): Retrieves URL query parameters and returns them as an object.
   * truncateString(str, length): Truncates a string to a specified length and appends an ellipsis.
   * slugify(str): Converts a string into a URL-friendly slug.

  Event Handling
   - delegate(selector, event, handler): A robust event delegation helper.

  Animation Utilities
   - fadeIn(el, duration): Fade in an element.
   - fadeOut(el, duration): Fade out an element.
   - slideUp(el, duration): Slide an element up.
   - slideDown(el, duration): Slide an element down.

  Cookie Utilities
   - setCookie(name, value, days): Set a cookie.
   - getCookie(name): Get a cookie.
   - deleteCookie(name): Delete a cookie.

  API/AJAX Utilities
   - httpGet(url): A simple GET request wrapper around fetch.
   - httpPost(url, data): A simple POST request wrapper around fetch.