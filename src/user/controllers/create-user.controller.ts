import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDtoPostRequest } from '../../common/dtos/user/user-dto-post-request.dto';
import { CreateUserService } from '../providers/create-user.service';

// todo: rever se realmente é necessario criar esse endpoint
//   pode-se chamar o service no signin auth-module
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() payload: UserDtoPostRequest) {
    return await this.createUserService.execute(payload);
  }
}
