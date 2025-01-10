import { plainToInstance } from 'class-transformer';
import { AppEnvValidator } from './env.validator';
import { validateSync } from 'class-validator';

export class AppConfigManager {
  static validateAppEnviroment(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(AppEnvValidator, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, { skipMissingProperties: true });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}
