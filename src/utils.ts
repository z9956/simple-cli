import { access, constants } from 'fs';
import ora from 'ora';
import shell from 'shelljs';

const clone = require('git-clone');

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
