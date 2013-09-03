module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
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

	grunt.loadNpmTasks('grunt-http-server');

	// Default task(s).
	grunt.registerTask( 'default', ['http-server'] );
};