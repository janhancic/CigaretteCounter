module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		uglify: {
			build: {
				src: 'src/app.js',
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

	grunt.registerTask( 'make', [ 'uglify', 'make-html', 'update-appcache'] );

	grunt.registerTask( 'make-html', 'Prepeares a "production" index.html file', function () {
		var devFileContent = grunt.file.read( 'src/index.html' );
		var appJsFileContent = grunt.file.read( 'build/app.min.js' );
		var productionFile = devFileContent;

		productionFile = productionFile.replace(
			'<script type="text/javascript" src="app.js"></script>',
			'<script type="text/javascript">' + appJsFileContent + '</script>'
		);

		productionFile = productionFile.replace(
			'<html>',
			'<html manifest="cc.appcache">'
		);

		grunt.file.write( 'build/index.html', productionFile);
	} );

	grunt.registerTask( 'update-appcache', 'Updates the revision comment in appcache file', function () {
		var appCacheFileContent = grunt.file.read( 'build/cc.appcache' );
		var currentRevision = appCacheFileContent.match( /# revision ([0-9]*)/ )[1] * 1;

		appCacheFileContent = appCacheFileContent.replace( /# revision ([0-9]*)/, '# revision ' + (currentRevision + 1) );

		grunt.file.write( 'build/cc.appcache', appCacheFileContent );
	} );

};