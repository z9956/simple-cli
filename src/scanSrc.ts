import { readdirSync, statSync } from 'fs';
import { extname, join } from 'path';

import { TemplateInfo } from '@/types/cli';

const templateJson = {
	Typescript: [],
	Javascript: [],
	'Sass/Scss': [],
	Css: [],
};

export const generateTemplate = (
	file: string,
	template: TemplateInfo = templateJson,
	ignoreFile: string[],
) => {
	if (~ignoreFile.indexOf(file)) return;

	if (file) {
		const stat = statSync(file);
		if (stat.isFile()) {
			const fileExtname = extname(file);

			switch (fileExtname) {
				case '.ts':
					template.Typescript.push(file);
					break;
				case '.js':
					template.Javascript.push(file);
					break;
				case '.sass':
				case '.scss':
					template['Sass/Scss'].push(file);
					break;
				case '.css':
					template.Css.push(file);
			}
		}

		if (stat.isDirectory()) {
			const res = readdirSync(file);
			res.forEach((item: string) => {
				const filePath = join(file, item);
				generateTemplate(filePath, template, ignoreFile);
			});
		}

		return template;
	} else {
		throw new Error('请输入正确的目录');
	}
};
