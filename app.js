window.app = (function ( localStorage ) {
	/*
	This is basically an experiment on how far I can get without needing any frameworks.
	That is why the code is so unstructured ATM.
	*/

	var app = {},
		numberEl = null,
		messageEl = null,
		num = 0,
		currentLoadingNum = 0,
		undoEl,
		undoTimer;

	app.start = function ( numberContainerId, messageContainerId ) {
		numberEl = document.getElementById( numberContainerId );
		messageEl = document.getElementById( messageContainerId );

		loadNumber();

		numberEl.addEventListener( 'click', handleClick );
	};

	function handleClick () {
		num = num + 1;
		saveToStorage( num );

		numberEl.innerHTML = num;
		updateMessage ( num )

		clearUndo();
		createUndo();

		return false;
	};

	function createUndo () {
		undoEl = document.createElement( 'div' );
		undoEl.setAttribute( 'id', 'Undo' );
		undoEl.innerHTML = 'undo';

		document.body.appendChild( undoEl );

		undoEl.addEventListener( 'click', handleUndo );

		undoTimer = setTimeout(
			clearUndo,
			1000 * 3
		);
	};

	function handleUndo () {
		num = num - 1;
		saveToStorage( num );

		numberEl.innerHTML = num;
		updateMessage( num );

		clearUndo();

		return false;
	};

	function clearUndo () {
		undoTimer && clearTimeout( undoTimer );
		undoTimer = null;

		undoEl && document.body.removeChild( undoEl );
		undoEl = null;
	}

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

		numberEl.innerHTML = '0';
		saveToStorage(num, date);
		updateMessage( num );

		if ( num >= 1 ) {
			setTimeout( doCountUp, 150 );
		}
	};

	function updateMessage ( numToUse ) {
		var messages = [
			'Horay!', // 0
			'So far so good!', // 1
			'Not to shabby!', // 2
			'Did you really need this one?', // 3
			'It better be after 12PM now!', // 4
			'It\'s after lunch, so OK!', // 5
			'Start slowing down!', // 6
			'*khm*', // 7
			'You could stop now, you know?', // 8
			'Seriously, time to stop for today.', // 9
			'Hope this is the last one!', // 10
			'You are hopeless!' // 11
		];

		if ( numToUse < messages.length ) {
			messageEl.innerHTML = messages[numToUse];
		} else {
			messageEl.innerHTML = messages[messages.length - 1];
		}
	};

	function doCountUp () {
		currentLoadingNum = currentLoadingNum + 1;
		numberEl.innerHTML = currentLoadingNum;
		updateMessage( currentLoadingNum );

		if ( currentLoadingNum < num ) {
			setTimeout( doCountUp, 150 + 2 * currentLoadingNum );
		}
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