import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { UserDtoPutRequest } from 'src/presentation/dto/user-dto-put-request.dto';
import { UpdateUserService } from '../services/update-user.service';

@Controller('auth')
export class UpdateUserAction {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put('users/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() user: UserDtoPutRequest) {
    return this.updateUserService.handle(+id, user);
  }
}
