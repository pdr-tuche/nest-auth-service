export enum AppConfigEnum {
  APP_PORT = +process.env.PORT,
  BCRYPT_SALT_ROUNDS = +process.env.BCRYPT_SALT_ROUNDS,
}
