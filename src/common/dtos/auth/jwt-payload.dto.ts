import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  sub: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  iat: number;

  @IsNumber()
  @IsNotEmpty()
  exp: number;
}
