import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetUserByIdService } from '../services/get-by-id.service';

@Controller('auth')
export class ShowUserAction {
  constructor(private readonly getUserById: GetUserByIdService) {}

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: string) {
    return await this.getUserById.handle(+id);
  }
}
