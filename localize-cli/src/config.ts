import fs from 'fs-extra';
import path from 'path';
import type { AppConfig } from './types';

const CONFIG_FILE = path.join(process.cwd(), '.localizeplatrc.json');

export const loadConfig = (): AppConfig => {
  if (fs.existsSync(CONFIG_FILE)) {
    return fs.readJSONSync(CONFIG_FILE) as AppConfig;
  }
  return {};
}

export const saveConfig = (config: AppConfig): void => {
  fs.writeJSONSync(CONFIG_FILE, config, { spaces: 2 });
}

export const getApiKey = (): string | undefined => {
  return loadConfig().apiKey;
}

export const getBaseUrl = (): string => {
    // TODO change this to deployed url
  return loadConfig().baseUrl ?? 'http://localhost:3000';
}