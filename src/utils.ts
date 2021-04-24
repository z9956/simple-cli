import { access, constants } from 'fs';
import ora from 'ora';
import shell from 'shelljs';
import chalk from 'chalk';
import * as memFs from 'mem-fs';
import * as editor from 'mem-fs-editor';

const clone = require('git-clone');

export const spinner = ora('');
export const warpSpin = async ({
	text,
	func,
	successText,
}: {
	text: string;
	func: Function;
	successText: string;
}) => {
	const loadingLog = spinner.start(text);
	loadingLog.color = 'blue';
	await func();
	loadingLog.color = 'green';
	loadingLog.succeed(successText);
	loadingLog.stop();
};

export const downLoadTemp = ({ url, path }: { url: string; path: string }) => {
	return new Promise<void>((resolve, reject) => {
		clone(url, path, null, (err?: Error) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

export const isFileExist = (path: string) => {
	return new Promise((resolve) => {
		access(path, constants.F_OK, (err) => {
			resolve(Boolean(!err));
		});
	});
};

export const deleteFile = (path: string) => {
	shell.rm('-rf', path);
};

export const installCmd = () => {
	const hasNpm = shell.which('npm');
	const hasYarn = shell.which('yarn');

	if (hasYarn) return 'yarn';

	if (hasNpm) return 'npm install';
};

export const logErrorAndExit = (text: string) => {
	chalk.bold.red(text);
	process.exit();
};

export const parseTemplate = ({
	from,
	to,
	setting,
}: {
	from: string;
	to: string;
	setting: Record<string, unknown>;
}) => {
	const fs = editor.create(memFs.create());

	return new Promise<void>((resolve, reject) => {
		fs.copyTpl(from, to, setting);

		fs.commit((err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

export const parseAndDeleteTemp = async ({
	from,
	to,
	setting,
}: {
	from: string;
	to: string;
	setting: Record<string, unknown>;
}) => {
	await parseTemplate({ from, to, setting });
	deleteFile(from);
};
