export interface AppConfigInterface {
  BCRYPT_SALT_ROUNDS: number;
  PORT: number;
}

export const AppConfig = (): AppConfigInterface => {
  return {
    BCRYPT_SALT_ROUNDS: +process.env.BCRYPT_SALT_ROUNDS,
    PORT: +process.env.PORT,
  };
};
