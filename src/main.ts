import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigEnum } from './common/enums/app-config.enum';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(AppConfigEnum.APP_PORT ?? 3000);
}
bootstrap();
