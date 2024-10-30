import { NestFactory } from '@nestjs/core';
import { AppConfig } from './config/app.config';
import { UserModule } from './domain/users/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(AppConfig().PORT ?? 3000);
}
bootstrap();
