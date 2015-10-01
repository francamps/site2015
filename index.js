var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    concat = require('metalsmith-concat'),
    _ = require('underscore'),
    dirname = require('path').dirname,
    extname = require('path').extname,
    basename = require('path').basename,
    collections = require('metalsmith-collections');

Metalsmith(__dirname)
	.source('./src')
	.use(concat({
	    files: 'css/**/*.css',
	    output: 'css/index.css'
	  }))
	.use(markdown())
	.use(collections({
		posts: {
			pattern: "*.md",
			sortBy: "date",
			reverse: true
		}
	}))
	.use(articleIndex())
	.metadata({
        partials: {
            _navigation: '_navigation',
            _socialFooter: '_socialFooter',
            _headerArticle: '_headerArticle',
            _head: '_head'
        }
    })
	.use(templates('handlebars'))
	.destination('./build')
	.build(function(err){
	    if (err) throw err;
	});

/**
 * Expose `plugin`.
 */

module.exports = articleIndex;

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