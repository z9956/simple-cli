import { Command } from 'commander';

import { InterfaceCLI } from '@/types/cli';
import { handleOptions } from '@/handleOptions';

const packageJSON = require('../package.json');
const cli: InterfaceCLI = new Command();

cli
	.description('simple cli...')
	.version(packageJSON.version, '-v --version')
	.option('-i --init <project>', 'init project')
	.option('-d --debug', 'show debug info')
	.action((options: InterfaceCLI) => handleOptions(options))
	.on('--help', () => {
		console.log('Example call:');
		console.log(' $ simple --help');
	})
	.parse(process.argv);
