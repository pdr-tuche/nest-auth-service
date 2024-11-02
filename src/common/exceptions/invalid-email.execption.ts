import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';

export class InvalidEmailException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.INVALID_EMAIL, HttpStatus.BAD_REQUEST);
  }
}
