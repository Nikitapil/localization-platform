import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('/api');

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  });

  const config = new DocumentBuilder().setTitle('Localization-platform').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const prepareErrors = (errs: ValidationError[]) => {
          return errs.reduce((acc, error) => {
            if (error.children?.length) {
              acc = { ...acc, [error.property]: prepareErrors(error.children) };
              return acc;
            }
            acc[error.property] = Object.values(error.constraints || {})
              .map((err: string) => err)
              .join(', ');
            return acc;
          }, {});
        };

        const preparedErrors = prepareErrors(errors);
        return new BadRequestException(preparedErrors);
      }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
