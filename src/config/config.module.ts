import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions, ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigManager } from './app/app-config.manager';
import { join } from 'path';

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    const { envFilePath, ...otherOptions } = options;

    const envFiles = [
      ...(Array.isArray(envFilePath) ? envFilePath : [envFilePath]),
      join(__dirname, `../../.env.${process.env.NODE_ENV}`),
      join(__dirname, '../../.env'),
    ];

    return super.forRoot({
      isGlobal: true,
      envFilePath: envFiles,
      validate: AppConfigManager.validateAppEnviroment,
      ...otherOptions,
    });
  }
}
