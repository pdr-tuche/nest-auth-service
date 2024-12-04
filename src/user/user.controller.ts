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
  UseFilters,
} from '@nestjs/common';
import { UserDtoPostRequest } from '../common/dtos/user/user-dto-post-request.dto';
import { UserDtoPutRequest } from '../common/dtos/user/user-dto-put-request.dto';
import { GetUserByIdService } from './providers/get-user-by-id.service';
import { CreateUserService } from './providers/create-user.service';
import { UpdateUserService } from './providers/update-user.service';
import { DeleteUserService } from './providers/delete-user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number) {
    return await this.getUserByIdService.handle(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() payload: UserDtoPostRequest) {
    return await this.createUserService.handle(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() user: UserDtoPutRequest) {
    return await this.updateUserService.handle(id, user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return await this.deleteUserService.handle(id);
  }
}
