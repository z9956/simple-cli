import commander from 'commander';

export interface InterfaceCLI extends commander.Command {
	debug?: boolean;
	init?: boolean;
	gen?: string;
}

export type TemplateInfo = {
	Typescript: string[];
	Javascript: string[];
	'Sass/Scss': string[];
	Css: string[];
};
