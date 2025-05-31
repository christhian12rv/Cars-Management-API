import { ApiProperty } from '@nestjs/swagger';
import { Car } from 'src/modules/car/entities/car.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { BaseResponseDto } from 'src/shared/dtos/base-response.dto';

export class CarUsageResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: 'Dados do motorista',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
    type: Driver,
  })
  driver: Driver;

  @ApiProperty({
    description: 'Dados do automóvel',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
    type: Car,
  })
  car: Car;

  @ApiProperty({
    description: 'Motivo de utilização do automóvel',
    minLength: 2,
    example: 'Viagem',
  })
  reasonUse: string;

  @ApiProperty({
    description: 'Data final de utilização do automóvel',
    example: '2025-05-30T13:16:40.734Z',
  })
  endedAt?: Date;
}
