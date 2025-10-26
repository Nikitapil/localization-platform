import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Localization-platform').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const preparedErrors = errors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints || {})
            .map((err: string) => err)
            .join(', ');
          return acc;
        }, {});
        return new BadRequestException(preparedErrors);
      }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
