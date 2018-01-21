const { prompt } = require('./lib/prompt');
const { cloneRepos } = require('./lib/clone-repos');
const { createWPConfig } = require('./lib/create-wpconfig');
const { zip } = require('./lib/zip');
const gDir = dir => require('path').join(__dirname, '/' + dir);
let wpConfTmp;

const app = prompt
	.then(wpconfig => (wpConfTmp = wpconfig))
	.then(cloneRepos)
	.then(() => createWPConfig(gDir('tmp/wordpress'), wpConfTmp))
	.then(zip);
