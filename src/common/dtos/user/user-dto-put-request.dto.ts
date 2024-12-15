import { IsString, Length } from 'class-validator';

export class UserDtoPutRequest {
  //todo: ver a possibilidade de usar PickType
  @IsString()
  @Length(3, 255)
  name: string;
}
