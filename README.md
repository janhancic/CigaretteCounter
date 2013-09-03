# CigaretteCounter
A simple (and quickly hacked together) mobile web "app" I've made for myself to track how much I smoke each day. It stores it's data in `localStorage` and the data gets reset every day. Note that it has only been tested on desktop Chrome and on Dolphin on Android.

## How to use
Just copy `index.html` to a web server of your choice and that's it. Or if you want to use it locally, you can clone the repository and execute:

```
npm install
grunt
```

This will install dependencies and start a local static server, which you can access on `localhost:8080/index.dev.html`.

If you make any changes, run `grunt make` which will provide you with a "production" version of the `index.dev.html` file (`index.html`) with `app.js` minified and in-lined.


## Plans
I'll probably add some support to store historic data, but for now this is all I need.

## License
Licensed under MIT. See `LICENSE.md` file for details.