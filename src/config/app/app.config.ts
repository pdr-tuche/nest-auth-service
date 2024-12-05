interface AppConfigInterface {
  APP_PORT: number;
  BCRYPT_SALT_ROUNDS: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export const AppConfig = (): AppConfigInterface => {
  return {
    APP_PORT: +process.env.APP_PORT || 3000,
    BCRYPT_SALT_ROUNDS: +process.env.BCRYPT_SALT_ROUNDS || 10,
    JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  };
};
