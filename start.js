const { prompt } = require('./lib/prompt');
const { cloneRepos } = require('./lib/clone-repos');
const { createWPConfig } = require('./lib/create-wpconfig');
const gDir = dir => require('path').join(__dirname, '/' + dir);
const zipFolder = require('zip-folder');
const fs = require('fs-extra');
let wpConfTmp;

// !cleaned up ? clean up : go on
const app = prompt
	.then(wpconfig => (wpConfTmp = wpconfig))
	.then(cloneRepos)
	.then(() => createWPConfig(gDir('tmp/wordpress'), wpConfTmp))
	.then(() => {
		zipFolder(gDir('tmp'), gDir('headless-wp.zip'), function(err) {
			if (err) {
				console.log('oh no!', err);
			} else {
				console.log('EXCELLENT! ziped ! fin');
				fs
					.remove(gDir('tmp'))
					.then(() => {
						console.log('removed tmp folder');
					})
					.catch(err => {
						console.error(err);
					});
			}
		});
	});
