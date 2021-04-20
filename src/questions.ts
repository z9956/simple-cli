import inquirer from 'inquirer';
import { userInfo } from 'os';
import { cyan } from 'chalk';

import { ELanguage, EProjectConfig } from '@/constans';

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
