import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigEnum } from './common/enums/app-config.enum';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(AppConfigEnum.APP_PORT ?? 3000);
}
bootstrap();
