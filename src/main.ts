import { NestFactory } from '@nestjs/core';
import { AppConfig } from './config/app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppConfig().PORT ?? 3000);
}
bootstrap();
