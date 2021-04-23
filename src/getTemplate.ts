import { resolve } from 'path';
import inquirer from 'inquirer';

import { EProjectConfig } from '@/constans';
import { overrideQuestions } from '@/questions';
import { deleteFile, isFileExist } from '@/utils';

export const getTemplate = async (
	projectConfig: Record<EProjectConfig, string>,
) => {
	const projectPath = resolve(projectConfig[EProjectConfig.ProjectName]);

	const exist = await isFileExist(projectPath);

	if (exist) {
		const override = await inquirer.prompt(overrideQuestions);

		if (override[EProjectConfig.Override]) {
			console.log('> 正在删除原文件');
			deleteFile(projectPath);
			console.log('> 删除原文件成功');
		} else {
			throw new Error('请更换项目名称，或删除已存在的文件后重试');
		}
	}
};
