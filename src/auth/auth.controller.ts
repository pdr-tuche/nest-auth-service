import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDtoPostRequest } from './dto/user-dto-post-request.dto';
import { UserDtoPutRequest } from './dto/user-dto-put-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users/:id')
  async show(@Param('id') id: string) {
    return await this.authService.getUserById(+id);
  }

  @Post('users')
  async create(@Body() payload: UserDtoPostRequest) {
    return await this.authService.store(payload);
  }

  @Put('users/:id')
  update(@Param('id') id: string, @Body() user: UserDtoPutRequest) {
    return this.authService.update(+id, user);
  }

  @Delete('users/:id')
  delete(@Param('id') id: string) {
    return this.authService.delete(+id);
  }
}
