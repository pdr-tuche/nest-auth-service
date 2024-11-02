import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDtoPostRequest } from '../common/dtos/user/user-dto-post-request.dto';
import { UserDtoPutRequest } from '../common/dtos/user/user-dto-put-request.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: string) {
    return await this.userService.getUserById(+id);
  }

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() payload: UserDtoPostRequest) {
    return await this.userService.create(payload);
  }

  @Put('users/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() user: UserDtoPutRequest) {
    return this.userService.update(+id, user);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
