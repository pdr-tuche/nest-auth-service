import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
