import { Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { Public } from 'src/common/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get('secreto')
  @HttpCode(HttpStatus.OK)
  async secreto(@Req() req: Request) {
    return { message: 'Secreto', user: req.user };
  }
}
