import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/shared/exceptions/BaseHttpException.exception';

export class CarUsageNotFoundException extends BaseHttpException {
  constructor(message = 'Registro de utilização de automóvel não encontrado') {
    super(message, HttpStatus.NOT_FOUND, 'CAR_USAGE_NOT_FOUND');
  }
}

export class DriverIsAlreadyUsingACarCurrentlyException extends BaseHttpException {
  constructor(
    message = 'O motorista informado está utilizando um automóvel atualmente',
  ) {
    super(
      message,
      HttpStatus.CONFLICT,
      'DRIVER_IS_ALREADY_USING_A_CAR_CURRENTLY',
    );
  }
}

export class CarIsCurrentlyInUseException extends BaseHttpException {
  constructor(message = 'O automóvel informado está em uso atualmente') {
    super(message, HttpStatus.CONFLICT, 'CAR_IS_CURRENTLY_IN_USE');
  }
}
