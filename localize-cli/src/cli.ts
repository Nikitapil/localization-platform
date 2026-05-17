#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import { select } from '@inquirer/prompts';
import { PromptModulePublicQuestion } from 'inquirer/dist/types';
import chalk from 'chalk';
import fs from 'fs-extra';
import { loadConfig, saveConfig } from './config';
import { fetchTexts } from './api/requests';
import { writeTranslations } from './utils/files';
import {CliInputOptions, CliOutputOptions, GetKeysMethod} from './types';
// TODO рефакторинг, разделить на входные и выходные опции и сделать нормально

async function promptForMissingOptions(inputOptions: CliInputOptions): Promise<CliOutputOptions> {
  const questions: PromptModulePublicQuestion<CliInputOptions>[] = [];

  const config = loadConfig()

  if (!inputOptions.apiKey) {
    const savedKey = config.apiKey;
    if (savedKey) {
      console.log(chalk.yellow('Using saved API key from config file'));
      inputOptions.apiKey = savedKey;
    } else {
      questions.push({
        type: 'input',
        name: 'apiKey',
        message: 'Enter API key:',
        validate: (value: string) => value.trim() !== '' || 'API key is required',
      });
    }
  }

  if (!inputOptions.keys && !inputOptions.keyFilePath) {
    const filePathFromConfig = config.keyFilePath
    if (filePathFromConfig) {
        inputOptions.keyFilePath = filePathFromConfig
    } else {
        const getKeysMethod = await select<GetKeysMethod>({ 
            message: 'Choose the way to collect your text keys',
            choices: [
                {
                  name: 'Write here',
                  value: 'here',
                  description: 'You will be able to write keys in comma separated way right here in teminal'
                },
                {
                  name: 'Write path to json file with array of keys',
                  value: 'file',
                  description: 'You will be able to write path to file with texts keys array'
                }
                // TODO collect with i18n parser
            ]
        })
        switch (getKeysMethod) {
          case 'here': {
            questions.push({
              type: 'input',
              name: 'keys',
              message: 'Text keys (comma-separated):',
              validate: (value: string) => value.trim() !== '' || 'IDsrequired',
            });
            break  
          } 
          case 'file': {
            questions.push({
              type: 'input',
              name: 'keyFilePath',
              message: 'Path to JSON file:',
              // TODO improve this validation to check that file exist
              validate: (value: string) => value.trim() !== '' || 'file path required',
            });
            break  
          }
        }
    }
  }

  if (!inputOptions.outPutDir) {
    if (config.outPutDir) {
      inputOptions.outPutDir = config.outPutDir
    } else {
      questions.push({
      type: 'input',
      name: 'outPutDir',
      message: 'Output directory:',
      default: './translations',
    });
    }
  }

  const answers = await inquirer.prompt<CliInputOptions>(questions); // приведение типов для совместимости

  const apiKey = inputOptions.apiKey || answers.apiKey
  const outPutDir = inputOptions.outPutDir || answers.outPutDir

  if (!apiKey) {
    throw new Error('Api key is required')
  }

  if (!outPutDir) {
    throw new Error('Output dir path is required')
  }

  const keyFilePath = inputOptions.keyFilePath || answers.keyFilePath;
  const keysFromInput = inputOptions.keys || answers.keys

  let keys: string[] = []

  if (keyFilePath) {
    if (!fs.existsSync(keyFilePath)) {
      throw new Error(`File with keys not found: ${keyFilePath}`)
    }
    keys = fs.readJSONSync(keyFilePath) as string[]
  } else if (keysFromInput) {
    keys = keysFromInput.split(',').map(s => s.trim())
  }

  if (!keys.length) {
    throw new Error(`No text keys found`)
  }

  const outputOptions: CliOutputOptions = {
    apiKey,
    outPutDir,
    keys
  }

  return outputOptions
}

export async function run(): Promise<void> {
  const program = new Command();

  program
    .name('localize-platform')
    .description('Export translation texts from API to JSON files per language')
    .option('-a, --api-key <apiKey>', 'API key')
    .option('-k, --keys <keys>', 'Comma-separated text IDs')
    .option('-f, --file <keyFilePath>', 'JSON file with array of text IDs')
    .option('-o, --out <outPutDir>', 'Output directory', './translations')
    .action(async (opts: CliInputOptions) => {
      try {
        const options = await promptForMissingOptions(opts);

        saveConfig({
          apiKey: options.apiKey
        })

        console.log(chalk.blue(`Fetching ${options.keys.length} texts...`));
        const texts = (await fetchTexts(options.keys)).texts;

        const outDir = options.outPutDir;
        console.log(chalk.blue('Writing translation files...'));
        await writeTranslations(texts, outDir);
        console.log(chalk.green.bold('Done!'));
      } catch (err: any) {
        console.error(chalk.red('Error:'), err.message);
        process.exit(1);
      }
    });

  program.parse(process.argv);
}

// Запуск только при прямом вызове
if (process.argv[1] === __filename) {
  run().catch((err) => {
    console.error(chalk.red('Fatal error:'), err);
    process.exit(1);
  });
}