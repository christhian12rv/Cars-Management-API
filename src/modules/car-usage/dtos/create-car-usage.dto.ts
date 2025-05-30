import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCarUsageDto {
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

  @ApiProperty({
    description: 'Motivo de utilização do automóvel',
    minLength: 2,
    example: 'Viagem',
  })
  @MinLength(2, {
    message: 'Motivo de utilização deve conter no mínimo 2 caracteres',
  })
  @IsString({ message: 'Motivo de utilização deve ser uma string' })
  @IsNotEmpty({ message: 'Motivo de utilização é obrigatório' })
  reasonUse: string;
}
