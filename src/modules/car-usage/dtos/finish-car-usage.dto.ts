import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FinishCarUsageDto {
  @ApiProperty({
    description: 'Id do motorista',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  @IsNotEmpty({ message: 'Id do motorista é obrigatório' })
  driverId: string;

  @ApiProperty({
    description: 'Id do automóvel',
    example: '38666be4-43fb-46d0-82df-c75673c13114',
  })
  @IsNotEmpty({ message: 'Id do carro é obrigatório' })
  carId: string;
}
