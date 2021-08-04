import { resolve } from 'path';
import inquirer from 'inquirer';

import { EGithubSource, EProjectConfig, GithubSource } from '@/constans';
import { overrideQuestions, useGitSource } from '@/questions';
import { deleteFile, downLoadTemp, isFileExist, warpSpin } from '@/utils';
import { createProject } from '@/createProject';

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

	let githubSource = await inquirer.prompt(useGitSource);
	githubSource = githubSource[EProjectConfig.UseGithubSource];
	githubSource = GithubSource[githubSource as EGithubSource];

	await warpSpin({
		text: '> 开始获取项目模板',
		successText: '> 获取项目模板成功',
		func: async () => {
			await downLoadTemp({
				url: githubSource,
				path: projectPath,
			});
		},
	});

	await createProject(projectConfig, projectPath);
};
