import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteUserService } from '../providers/delete-user.service';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return await this.deleteUserService.execute(id);
  }
}
