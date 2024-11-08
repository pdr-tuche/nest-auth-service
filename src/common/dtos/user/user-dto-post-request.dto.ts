import { IsEmail, IsString, Length } from 'class-validator';

export class UserDtoPostRequest {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;
}
