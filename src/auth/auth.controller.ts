import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostUserDto } from './dto/post-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.authService.getUserById(+id);
  }

  @Post('users')
  create(@Body() user: PostUserDto) {
    return this.authService.createUser(user);
  }
}
