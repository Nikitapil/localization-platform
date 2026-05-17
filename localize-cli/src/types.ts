export type CliInputOptions = {
  apiKey?: string;
  keys?: string;
  keyFilePath?: string;
  outPutDir?: string;
}

export type CliOutputOptions = {
  apiKey: string;
  keys: string[];
  outPutDir: string;
}

export type GetKeysMethod = 'here' | 'file'

export interface AppConfig {
  apiKey?: string;
  baseUrl?: string;
  keyFilePath?: string;
  outPutDir?: string;
}

export interface TextLangFromApi {
  id: string;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface TextTranslationFromApi {
  id: string;

  lang: TextLangFromApi;

  value: string;
}

export interface TextFromApi {
  id: string;

  key: string;

  translations: TextTranslationFromApi[];

  updatedAt: Date;
}

export interface TextListResponse {
  texts: TextFromApi[];

  totalCount: number;
}