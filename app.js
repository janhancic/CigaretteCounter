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
		localStorage.setItem( 'num', num );

		numberEl.innerHTML = num;
	};

	function loadNumber () {
		num = localStorage.getItem( 'num' ),
			date = localStorage.getItem( 'date' );

		if ( num == null ) {
			num = 0;
			localStorage.setItem( 'num', 0 );
		} else {
			num = Number( num );
		}

		if ( date == null ) {
			date = getCurrentDate();
			localStorage.setItem( 'date', date );
		}

		if ( date !== getCurrentDate() ) {
			// reset data
			localStorage.setItem( 'num', 0 );
			localStorage.setItem( 'date', getCurrentDate() );

			num = 0;
			date = getCurrentDate();
		}

		numberEl.innerHTML = num;
	};

	function getCurrentDate () {
		var tmp = new Date();
		return '' + tmp.getFullYear() + tmp.getMonth() + tmp.getDay();
	};

	return app;
}( window.localStorage ) );