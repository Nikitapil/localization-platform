import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs, createReadStream } from 'fs';
import { ExportTranslationToJsonParams } from './types';

@Injectable()
export class TranslationFilesService {
  private readonly tempDir = path.join(process.cwd(), 'temp-exports');

  constructor(private readonly prismaService: PrismaService) {}

  private async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  async exportLangTranslationsToJson({ dto, user }: ExportTranslationToJsonParams) {
    await this.ensureTempDir();

    let filePath: string = '';

    try {
      const lang = await this.prismaService.lang.findUnique({
        where: { id: dto.langId, profileId: user.profileId },
        select: {
          name: true,
          translations: {
            select: {
              text: true,
              value: true
            }
          }
        }
      });

      if (!lang) {
        throw new NotFoundException({ message: 'Language not found' });
      }

      const filename = `${lang.name}_translations.json`;
      filePath = path.join(this.tempDir, filename);

      // Записываем данные в файл
      const data = lang.translations.reduce((acc, translation) => {
        acc[translation.text.key] = translation.value;
        return acc;
      }, {});
      const jsonContent = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonContent, 'utf8');

      const file = createReadStream(filePath);
      const streamableFile = new StreamableFile(file, {
        disposition: `attachment; filename="${filename}"`,
        type: 'application/json'
      });

      file.on('end', () => {
        fs.unlink(filePath);
      });

      file.on('error', async () => {
        await fs.unlink(filePath);
      });

      return streamableFile;
    } catch (error) {
      if (filePath) {
        await fs.unlink(filePath);
      }
      throw error;
    }
  }
}
