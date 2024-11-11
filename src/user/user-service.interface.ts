import { UserDtoPostRequest } from 'src/common/dtos/user/user-dto-post-request.dto';
import { UserDtoPutRequest } from 'src/common/dtos/user/user-dto-put-request.dto';
import { UserDto } from 'src/common/dtos/user/user.dto';

export interface UserServiceInterface {
  getUserById(id: number): Promise<UserDto>;
  create(payload: UserDtoPostRequest): Promise<UserDto>;
  update(userId: number, payload: UserDtoPutRequest): Promise<UserDto>;
  delete(userId: number): void;
}
