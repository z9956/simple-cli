import shell from 'shelljs';
import inquirer from 'inquirer';

import { InterfaceCLI } from '@/types/cli';
import { EProjectConfig } from '@/constans';
import { projectQuestions } from '@/questions';
import { logErrorAndExit } from '@/utils';
import { getTemplate } from '@/getTemplate';

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
			)) || null;

		console.log('\n> 项目配置信息:');
		console.log(projectConfig);

		if (projectConfig) await getTemplate(projectConfig);
	} catch (e) {
		logErrorAndExit(e);
	}
};
