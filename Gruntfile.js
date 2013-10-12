module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		uglify: {
			build: {
				src: [ 'src/config.js', 'src/app.js' ],
				dest: 'build/app.min.js'
			}
		},
		'http-server': {
			'dev': {
				root: '.',
				port: 8080,
				host: "127.0.0.1",
				showDir : true,
				autoIndex: true,
				defaultExt: "html",
			}
		}
	} );

	grunt.loadNpmTasks('grunt-contrib-uglify' );
	grunt.loadNpmTasks('grunt-http-server');

	// Default task(s).
	grunt.registerTask( 'default', ['http-server'] );

	grunt.registerTask( 'make', [ 'uglify', 'make-html' ] );

	grunt.registerTask( 'make-html', 'Prepeares a "production" index.html file', function () {
		var devFileContent = grunt.file.read( 'src/index.html' );
		var appJsFileContent = grunt.file.read( 'build/app.min.js' );
		var productionFile = devFileContent;

		productionFile = productionFile.replace(
			'<script type="text/javascript" src="app.js"></script>',
			'<script type="text/javascript">' + appJsFileContent + '</script>'
		);

		productionFile = productionFile.replace( '<script type="text/javascript" src="config.js"></script>', '' );

		grunt.file.write( 'build/index.html', productionFile);

		// copy PHP and config files
		grunt.file.copy( 'src/reportr.php', 'build/reportr.php' );

		if ( grunt.file.exists( 'src/reportr.config.php' ) === true ) {
			grunt.file.copy( 'src/reportr.config.php', 'build/reportr.config.php' );
		}

		if ( grunt.file.exists( 'src/config.js' ) === true ) {
			grunt.file.copy( 'src/config.js', 'build/config.js' );
		}
	} );

};