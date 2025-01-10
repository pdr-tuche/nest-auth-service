import { IsIn, IsNumber, IsPositive, IsString, Matches } from 'class-validator';
import { EnvironmentEnum } from 'src/common/enums/enviroment.enum';

export class AppEnvValidator {
  @IsString()
  @IsIn(Object.values(EnvironmentEnum))
  NODE_ENV: string;

  @IsNumber()
  APP_PORT: number;

  @IsNumber()
  @IsPositive()
  BCRYPT_SALT_ROUNDS: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  @IsPositive()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_SCHEMA: string;

  @IsString()
  @Matches(
    new RegExp(
      '^[a-zA-Z]+://[a-zA-Z0-9]+:[a-zA-Z0-9]+@[a-zA-Z0-9.-]+:[0-9]+/[a-zA-Z0-9]+(\\?schema=[a-zA-Z0-9]+)?$',
    ),
    { message: 'DATABASE_CONNECTION_URL must be a valid connection string' },
  )
  DATABASE_CONNECTION_URL: string;
}
