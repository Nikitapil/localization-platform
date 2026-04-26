import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { LangModule } from './modules/lang/lang.module';
import { TextModule } from './modules/text/text.module';
import { TranslationModule } from './modules/translation/translation.module';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { TranslationFilesModule } from './modules/translation-files/translation-files.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    UserModule,
    AuthModule,
    LangModule,
    TextModule,
    TranslationModule,
    ApiKeysModule,
    TranslationFilesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AppModule {}
