import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const generateApiByPath = async () => {
  await generateApi({
    moduleNameIndex: 1,
    output: path.resolve(process.cwd(), `./src/api/swagger/`),
    templates: path.resolve(process.cwd(), './bin/ApiGenerator/templates'),
    url: `${process.env.VITE_API_BASE_URL}/docs-yaml`,
    httpClientType: 'axios',
    extractEnums: true,
    extractRequestParams: true,
    unwrapResponseData: true,
    cleanOutput: true,
    modular: true
  });
};

generateApiByPath();
