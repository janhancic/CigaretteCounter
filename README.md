# CigaretteCounter
A simple (and quickly hacked together) mobile web "app" I've made for myself to track how much I smoke each day. It stores it's data in `localStorage` and the data gets reset every day. Note that it has only been tested on desktop Chrome and on Dolphin on Android.

It also sends data to the [reportr](http://www.reportr.io/) service for historical collection and nice graphs.

## How to use

### Easy mode
Copy `build/index.html` to a web server of your choice and that's it (if you don't want to integrate with reportr).

### Lazy mode
Bookmark [janhancic.github.io/CigaretteCounter](http://janhancic.github.io/CigaretteCounter/) in your mobile browser and enjoy.

### Advanced mode
Run it locally:

```
git clone https://github.com/janhancic/CigaretteCounter.git
cd CigaretteCounter
npm install
grunt
```

This will install dependencies and start a local static server, which you can access on `localhost:8080/src/index.html`.

If you make any changes, run `grunt make` which will provide you with a "production" version of the `index.html` file (`build/index.html`) with `src/app.js` minified and in-lined.

## Reportr integration
If you want to send data to reportr (either your own instance or the one running on [www.reportr.io](http://www.reportr.io/)) you'll have to create two configuration files:

`src/config.js`, which should contain:

```javascript
window.app = (function () {
	var app = window.app || {};
	app.useReportr = true;
	return app;
} () );
```

And `src/reportr.config.php`, which should contain:

```php
<?php
$config = Array ();
$config['host'] = 'http://www.reportr.io/'; // or your own instance
$config['token'] = 'your-reportr-token';
$config['icon_url'] = 'URL of the image to be displayed in the reportr dashboard';
?>
```

With this in place run `grunt make`, which will copy everything to the `build` folder, and then you can copy that to your web server which must support PHP in order for the reporting to work.

## Plans
I'll probably add some support to store historic data, but for now this is all I need.

## License
Licensed under MIT. See `LICENSE.md` file for details.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/janhancic/cigarettecounter/trend.png)](https://bitdeli.com/free "Bitdeli Badge")