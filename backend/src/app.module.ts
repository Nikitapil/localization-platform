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

@Module({
  imports: [PrismaModule, ProfileModule, UserModule, AuthModule, LangModule, TextModule, TranslationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AppModule {}
