import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/shared/exceptions/BaseHttpException.exception';

export class DriverNotFoundException extends BaseHttpException {
  constructor(message = 'Motorista não encontrado') {
    super(message, HttpStatus.NOT_FOUND, 'DRIVER_NOT_FOUND');
  }
}

export class DriverAlreadyExistsException extends BaseHttpException {
  constructor(message = 'Motorista já existe') {
    super(message, HttpStatus.CONFLICT, 'DRIVER_ALREADY_EXISTS');
  }
}
