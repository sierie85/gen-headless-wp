const NodeGit = require('nodegit');
const ora = require('ora');
const fse = require('fs-extra');
const { repos } = require('../data/repos');

const gDir = dir => require('path').join(__dirname, '../' + dir);

const cloneRepo = (repo, dir, name) => {
	const spinner = ora(`cloning ${name}`).start();

	return NodeGit.Clone(repo, gDir(dir))
		.then(function(rep) {
			spinner.stopAndPersist({ symbol: '✔', text: `${name} cloned!` });
			fse
				.remove(gDir(dir + '/.git'))
				.then(() => {})
				.catch(err => {
					console.log(err);
				});
		})
		.catch(err => {
			console.log(err);
		});
};

const deleteDefaultThemes = dir => {
	const spinnerRemoveDefaultThemes = ora(
		'removing default wordpress themes'
	).start();
	return fse
		.remove(gDir(dir + '/wp-content/themes'))
		.then(() => {
			spinnerRemoveDefaultThemes.stopAndPersist({
				symbol: '✔',
				text: 'successfully removed all default wordpress themes'
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.cloneRepos = async function() {
	fse.mkdirsSync('./tmp');
	const wp = await cloneRepo(repos.cms.wp, 'tmp/wordpress', 'wp');
	await deleteDefaultThemes('tmp/wordpress');
	fse.mkdirsSync('./tmp/wordpress/wp-content/themes');
	await cloneRepo(
		repos.theme.blank,
		'tmp/wordpress/wp-content/themes/blank',
		'theme blank'
	);
	for (let plugin in repos.plugins) {
		await cloneRepo(
			repos.plugins[plugin],
			`tmp/wordpress/wp-content/plugins/${plugin}`,
			`plugin ${plugin}`
		);
	}

	return wp;
};
