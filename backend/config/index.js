#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const envinfo = require('envinfo');
const createPalaceOfGoodsApp = require('./createPalaceOfGoodsApp');
const packageJson = require('./package.json');

let projectName;

program
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  })
  .option('--info', 'print environment debug info')
  .option('--template <template-name>', 'specify a template for the created project')
  .option('--typescript', 'use TypeScript template')
  .option('--with-backend', 'setup with Flask backend and PostgreSQL')
  .allowUnknownOption()
  .on('--help', () => {
    console.log();
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
    console.log('    If you have any problems, do not hesitate to file an issue:');
    console.log(`      ${chalk.cyan('https://github.com/yourusername/palace-of-goods/issues')}`);
    console.log();
  })
  .parse(process.argv);

const options = program.opts();

if (options.info) {
  console.log(chalk.bold('\nEnvironment Info:'));
  envinfo
    .run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'npm', 'Yarn'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: ['react', 'react-dom', 'react-scripts'],
    })
    .then(console.log);
  return;
}

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('palace-of-goods')}`);
  console.log();
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
  process.exit(1);
}

createPalaceOfGoodsApp(projectName, options);
