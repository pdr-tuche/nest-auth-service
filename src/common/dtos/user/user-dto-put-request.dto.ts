import { IsString, Length } from 'class-validator';

export class UserDtoPutRequest {
  @IsString()
  @Length(3, 255)
  name: string;
}
