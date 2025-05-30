import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/shared/exceptions/BaseHttpException.exception';

export class CarNotFoundException extends BaseHttpException {
  constructor(message = 'Automóvel não encontrado') {
    super(message, HttpStatus.NOT_FOUND, 'CAR_NOT_FOUND');
  }
}

export class CarAlreadyExistsException extends BaseHttpException {
  constructor(message = 'Automóvel já existe') {
    super(message, HttpStatus.CONFLICT, 'CAR_ALREADY_EXISTS');
  }
}
