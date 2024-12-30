import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetUserByIdService } from '../providers/get-user-by-id.service';

@Controller('users')
export class FindUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number) {
    return await this.getUserByIdService.execute(id);
  }
}
