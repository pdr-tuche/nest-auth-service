import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigEnum } from './enums/app-config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppConfigEnum.APP_PORT ?? 3000);
}
bootstrap();
