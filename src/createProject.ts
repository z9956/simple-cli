import { resolve } from 'path';
import { cd, exec, rm } from 'shelljs';
import { blue } from 'chalk';

import { deleteFile, installCmd, parseAndDeleteTemp } from '@/utils';
import { BaseDir, ELanguage, EProjectConfig } from '@/constans';
import { generateTemplate } from '@/scanSrc';

export const createProject = async (
	projectConfig: Record<EProjectConfig, string>,
	projectPath: string,
) => {
	const gitFile = resolve(projectPath, '.git');
	deleteFile(gitFile);

	await parseAndDeleteTemp({
		from: resolve(projectPath, 'package.json.tmp'),
		to: resolve(projectPath, 'package.json'),
		setting: projectConfig,
	});

	blue('> 开始创建模版...');
	cd(projectPath);

	const templateInfo = generateTemplate(BaseDir, void 0, []);

	if (projectConfig.Language === ELanguage.Javascript) {
		rm('-rf', templateInfo.Typescript);
		rm('-rf', 'tsconfig.json');
	}

	if (projectConfig.Language === ELanguage.Typescript) {
		rm('-rf', templateInfo.Javascript);
	}

	blue('> 模版创建成功，开始安装依赖...');

	const cmd = installCmd();
	exec(cmd);

	blue('> 项目创建成功');
	console.log('');
};
