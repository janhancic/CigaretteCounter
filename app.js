window.app = (function ( localStorage ) {
	var app = {},
		numberEl = null,
		num = 0;

	app.start = function ( numberContainerId ) {
		numberEl = document.getElementById( numberContainerId );

		loadNumber();

		numberEl.addEventListener( 'click', handleClick );
	};

	function handleClick () {
		num = num + 1;
		saveToStorage( num );

		numberEl.innerHTML = num;

		return false;
	};

	function loadNumber () {
		num = localStorage.getItem( 'num' ),
			date = localStorage.getItem( 'date' );

		if ( num == null ) {
			num = 0;
		} else {
			num = Number( num );
		}

		if ( date == null ) {
			date = getCurrentDate();
		}

		if ( date !== getCurrentDate() ) {
			num = 0;
			date = getCurrentDate();
		}

		numberEl.innerHTML = num;

		saveToStorage(num, date);
	};

	function saveToStorage ( num, date ) {
		localStorage.setItem( 'num', num );
		date && localStorage.setItem( 'date', date );
	};

	function getCurrentDate () {
		var tmp = new Date();
		return '' + tmp.getFullYear() + tmp.getMonth() + tmp.getDay();
	};

	return app;
}( window.localStorage ) );