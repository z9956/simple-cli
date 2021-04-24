export enum EProjectConfig {
	ProjectName = 'ProjectName',
	Author = 'Author',
	Description = 'Description',
	Language = 'Language',
	CSS = 'CSS',
	Override = 'Override',
	UseGithubSource = 'UseGithubSource',
}

export enum ELanguage {
	Typescript = 'Typescript',
	Javascript = 'Javascript',
}

export enum ECss {
	Css = 'Css',
	Sass = 'Sass/Scss',
}

export enum EGithubSource {
	SSH = 'SSH',
	HTTPS = 'HTTPS',
}

export const GithubSource = {
	[EGithubSource.SSH]: 'git@github.com:z9956/react-template.git',
	[EGithubSource.HTTPS]: 'https://github.com/z9956/react-template.git',
};

export const BaseDir = 'src';
