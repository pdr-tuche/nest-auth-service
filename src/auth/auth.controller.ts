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
import { PostUserDto } from './dto/post-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users/:id')
  async show(@Param('id') id: string) {
    return await this.authService.getUserById(+id);
  }

  @Post('users')
  async create(@Body() userDto: PostUserDto) {
    return await this.authService.create(userDto);
  }

  @Put('users/:id')
  update(@Param('id') id: string, @Body() user: PostUserDto) {
    return this.authService.update(+id, user);
  }

  @Delete('users/:id')
  delete(@Param('id') id: string) {
    return this.authService.delete(+id);
  }
}
