import inquirer from 'inquirer';
import { userInfo } from 'os';
import { cyan, red } from 'chalk';

import { EGithubSource, ELanguage, EProjectConfig } from '@/constans';

export const projectQuestions: Array<inquirer.QuestionCollection> = [
	{
		type: 'input',
		name: EProjectConfig.ProjectName,
		message: cyan('The name of this project'),
		validate: (input: string) => {
			if (input && input.trim()) return true;

			return 'project name is required';
		},
	},
	{
		type: 'input',
		name: EProjectConfig.Author,
		message: cyan('The author of this project'),
		default: userInfo().username,
		validate: (input: string) => {
			if (input && input.trim()) return true;

			return 'author is required';
		},
	},
	{
		type: 'input',
		name: EProjectConfig.Description,
		message: cyan('The description of this project'),
		default: '',
		validate: (input: string) => {
			if (input && input.trim()) return true;

			return 'description is required';
		},
	},
	{
		type: 'list',
		name: EProjectConfig.Language,
		message: cyan('What language do you want to use?'),
		choices: [ELanguage.Typescript, ELanguage.Javascript],
	},
];

export const overrideQuestions = [
	{
		type: 'confirm',
		name: EProjectConfig.Override,
		message: red('当前目录已存在同名文件，是否删除原文件?'),
		default: false,
	},
];

export const useGitSource = [
	{
		type: 'list',
		name: EProjectConfig.UseGithubSource,
		message: cyan('Use https or ssh to pull templates?'),
		choices: [EGithubSource.SSH, EGithubSource.HTTPS],
	},
];
