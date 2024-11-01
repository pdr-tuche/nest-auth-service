import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDtoPostRequest } from 'src/presentation/dto/user-dto-post-request.dto';
import { StoreUserService } from '../services/store-user.service';

@Controller('auth')
export class CreateUserAction {
  constructor(private readonly storeUserService: StoreUserService) {}

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: UserDtoPostRequest) {
    return await this.storeUserService.handle(payload);
  }
}
