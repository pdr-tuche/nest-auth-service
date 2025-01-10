import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
