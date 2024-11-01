import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { DeleteUserService } from '../services/delete-user.service';

@Controller('auth')
export class DeleteUserAction {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id') id: string) {
    return this.deleteUserService.handle(+id);
  }
}
