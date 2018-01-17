const fse = require('fs-extra');
const replaceStream = require('replacestream');
const fetch = require('node-fetch');

exports.createWPConfig = async (sampleDir, wpconf) => {
	const writeStream = fse.createWriteStream(`${sampleDir}/wp-config.php`);
	fse
		.createReadStream(`${sampleDir}/wp-config-sample.php`)
		.pipe(replaceStream('database_name_here', wpconf.DB_NAME))
		.pipe(replaceStream('username_here', wpconf.DB_USER))
		.pipe(replaceStream('password_here', wpconf.DB_PASSWORD))
		.pipe(replaceStream('localhost', wpconf.DB_HOST))
		.pipe(replaceStream('wp_', wpconf.table_prefix))
		.pipe(writeStream);

	return;
};
