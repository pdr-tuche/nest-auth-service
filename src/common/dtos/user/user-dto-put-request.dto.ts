import { PickType } from '@nestjs/swagger';
import { UserDtoPostRequest } from './user-dto-post-request.dto';

export class UserDtoPutRequest extends PickType(UserDtoPostRequest, ['name'] as const) {}
