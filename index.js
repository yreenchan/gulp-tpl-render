var through = require('through2');

function replace(replacement) {
	return through.obj(function(file, enc, cb) {
		var src = file.contents.toString();

		if (!replacement) replacement = {};

		src = src.replace(/{\$([^$}]+)}/gm, function(str, key) {
			if (typeof replacement[key] !== 'undefined') {
				return replacement[key];
			} else {
				return '';
			}
		});

		file.contents = new Buffer(src);
		this.push(file);
		cb();
	});
}

module.exports = replace;