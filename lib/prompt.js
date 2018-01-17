const inquirer = require('inquirer');
const { wpConfigSettings } = require('../data/wpConfigSettings');

const writeConfigPrompt = [
	{
		type: 'confirm',
		name: 'writeConfig',
		message: 'Fill wp config?',
		default: false
	}
];

exports.prompt = inquirer.prompt(writeConfigPrompt).then(answer => {
	if (answer.writeConfig) {
		return inquirer.prompt(wpConfigSettings).then(answers => {
			return answers;
		});
	} else {
		return;
	}
});
