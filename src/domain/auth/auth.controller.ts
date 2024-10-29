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
import { AuthService } from './auth.service';
import { UserDtoPostRequest } from '../../presentation/dto/user-dto-post-request.dto';
import { UserDtoPutRequest } from '../../presentation/dto/user-dto-put-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: string) {
    return await this.authService.getUserById(+id);
  }

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: UserDtoPostRequest) {
    return await this.authService.store(payload);
  }

  @Put('users/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() user: UserDtoPutRequest) {
    return this.authService.update(+id, user);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id') id: string) {
    return this.authService.delete(+id);
  }
}
