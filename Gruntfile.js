var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    concat = require('metalsmith-concat'),
    _ = require('underscore'),
    dirname = require('path').dirname,
    extname = require('path').extname,
    basename = require('path').basename,
    collections = require('metalsmith-collections');

/**
 * Expose `plugin`.
 */


/**
 * A Metalsmith plugin to sort articles by date.
 *
 * @return {Function}
 */

function articleIndex(){
	return function (files) {
		for (var file in files) {
			if (files[file].date) {
				files[file].dateStr = makeDateStr(files[file].date);
				files[file].url = makeURLFromTitle(files[file].title);
			}
		};
	}
}
module.exports = articleIndex;

function makeDateStr (date) {
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];

	var d = date.getDate(),
		y = date.getFullYear(),
		m = monthNames[date.getMonth()];
	return m + ' ' + d + ', ' + y;
}

function makeURLFromTitle (title) {
	return title.split(' ').join('_');
	
}

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			personalSite: {
				port: 8080,
				base: 'build'
			}
		},
		metalsmith: {
			site: {
				options: {
					"metadata": {
						"partials": {
					        _navigation: '_navigation',
					        _socialFooter: '_socialFooter',
					        _headerArticle: '_headerArticle',
					        _head: '_head'    		
						}
					},			
					"plugins": [
						{"metalsmith-markdown": {}},
						{"metalsmith-collections": {
													posts: "*.md",
													sortBy: "date"
												}},
						{"metalsmith-concat": {
													files: 'css/**/*.css',
							    					output: 'css/index.css'
												}},
						{"metalsmith-templates": {
													"engine": "handlebars",
													"directory": "./templates"
												}},
						{"articleIndex": articleIndex }
		 			]		
				},
				src: "./src",
				dest: "./build"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-metalsmith');
	grunt.registerTask('default', 'connect:personalSite');

};