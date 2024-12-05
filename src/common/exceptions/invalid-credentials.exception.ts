import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }
}
