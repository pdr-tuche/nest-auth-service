import { NestFactory } from '@nestjs/core';
import { AuthModule } from './domain/auth/auth.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(AppConfig().PORT ?? 3000);
}
bootstrap();
