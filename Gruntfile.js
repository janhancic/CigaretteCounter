module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		uglify: {
			build: {
				src: 'app.js',
				dest: 'app.min.js'
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

	grunt.registerTask( 'make', [ 'uglify', 'make-html'] );

	grunt.registerTask( 'make-html', 'Prepeares a "production" index.html file', function () {
		var devFileContent = grunt.file.read( 'index.dev.html' );
		var appJsFileContent = grunt.file.read( 'app.min.js' );
		var productionFile = devFileContent;

		productionFile = productionFile.replace(
			'<script type="text/javascript" src="app.js"></script>',
			'<script type="text/javascript">' + appJsFileContent + '</script>'
		);

		productionFile = productionFile.replace(
			'<html>',
			'<html manifest="cc.appcache">'
		);

		grunt.file.write( 'index.html', productionFile);
	} );

};