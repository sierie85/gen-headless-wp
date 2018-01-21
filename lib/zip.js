const gDir = dir => require('path').join(__dirname, '../' + dir);
const zipFolder = require('zip-folder');
const fs = require('fs-extra');

exports.zip = async function() {
	await zipFolder(gDir('tmp'), gDir(`headless-wp-${Date.now()}.zip`), function(
		err
	) {
		if (err) {
			console.log(err);
		} else {
			console.log('ziped!');
			fs
				.remove(gDir('tmp'))
				.then(() => {
					console.log('tmp folder removed. fin');
				})
				.catch(err => {
					console.error(err);
				});
		}
	});
};
