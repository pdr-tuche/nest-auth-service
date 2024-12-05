import { IsEmail, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
