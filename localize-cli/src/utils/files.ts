import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import {TextFromApi} from '../types';

export const writeTranslations = async (texts: TextFromApi[], outDir: string): Promise<void> => {

  const langMap = texts.reduce((acc: Record<string, Record<string, string>>, text) => {
    text.translations.forEach(translation => {
        const lang = translation.lang.name
        if (!acc[lang]) {
            acc[lang] = {}
        }
        acc[lang][text.key] = translation.value
    })
    return acc
  }, {})

  await fs.ensureDir(outDir);

  for (const [lang, map] of Object.entries(langMap)) {
    const filePath = path.join(outDir, `${lang}.json`);
    await fs.writeJson(filePath, map, { spaces: 2 });
    console.log(chalk.green(`✓ ${lang}.json – ${Object.keys(map).length} texts`));
  }
}