import shell from 'shelljs';

import { InterfaceCLI } from '@/types/cli';
import inquirer from 'inquirer';
import { EProjectConfig } from '@/constans';
import { projectQuestions } from '@/questions';

export const handleOptions = async (option: InterfaceCLI) => {
	const { debug, init } = option;
	try {
		if (debug) {
			console.error(option.opts());
		}

		if (!init) {
			option.help();
			return;
		}

		if (!shell.which('git')) {
			console.error('Please install git');
		}
		console.log('> 配置项目：');

		const projectConfig =
			(await inquirer.prompt<Record<EProjectConfig, string>>(
				projectQuestions,
			)) || {};
		console.log(projectConfig);

		console.log('\n> 项目配置信息:');
	} catch (e) {
		console.log(e);
	}
};
