import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/shared/entities/base-entity';

export class Driver extends BaseEntity {
  constructor() {
    super();
  }

  @ApiProperty({
    description: 'Nome do motorista',
    example: 'John Doe',
  })
  name: string;
}
