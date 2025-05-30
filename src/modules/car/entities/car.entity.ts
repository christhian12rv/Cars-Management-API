import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/shared/entities/base-entity';

export class Car extends BaseEntity {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'Placa do automóvel',
    example: 'OTM2A20',
  })
  plate: string;

  @ApiProperty({
    description: 'Cor do automóvel',
    example: 'Vermelho',
  })
  color: string;

  @ApiProperty({
    description: 'Marca do automóvel',
    example: 'Chevrolet',
  })
  brand: string;
}
