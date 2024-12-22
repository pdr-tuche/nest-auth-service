import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateUserService } from '../providers/update-user.service';
import { UserDtoPutRequest } from 'src/common/dtos/user/user-dto-put-request.dto';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() user: UserDtoPutRequest) {
    return await this.updateUserService.execute(id, user);
  }
}
