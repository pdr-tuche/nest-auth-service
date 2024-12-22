import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetUserByIdService } from '../providers/get-user-by-id.service';
import { Public } from 'src/common/decorators/is-public.decorator';

@Controller('users')
export class FindUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async show(@Param('id') id: number) {
    return await this.getUserByIdService.execute(id);
  }
}
