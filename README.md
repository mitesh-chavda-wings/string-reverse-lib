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