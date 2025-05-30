import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/shared/entities/base-entity';

export class CarUsage extends BaseEntity {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'Id do motorista',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  driverId: string;

  @ApiProperty({
    description: 'Id do automóvel',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  carId: string;

  @ApiProperty({
    description: 'Motivo de utilização do automóvel',
    minLength: 2,
    example: 'Viagem',
  })
  reasonUse: string;

  @ApiProperty({
    description: 'Data final de utilização do automóvel',
    example: '2025-06-02T09:00:32.330Z',
  })
  endedAt?: string;
}
