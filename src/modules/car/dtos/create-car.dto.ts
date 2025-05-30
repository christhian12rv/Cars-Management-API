import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: 'Placa do automóvel',
    minLength: 7,
    maxLength: 7,
    example: 'OTM2A20',
  })
  @IsString({ message: 'Placa deve ser uma string' })
  @Length(7, 7, { message: 'Placa deve conter 7 caracteres' })
  plate: string;

  @ApiProperty({
    description: 'Cor do automóvel',
    minLength: 2,
    example: 'Vermelho',
  })
  @IsString({ message: 'Cor deve ser uma string' })
  @MinLength(2, { message: 'Cor deve conter no mínimo 2 caracteres' })
  color: string;

  @ApiProperty({
    description: 'Marca do automóvel',
    minLength: 2,
    example: 'Chevrolet',
  })
  @IsString({ message: 'Marca deve ser uma string' })
  @MinLength(2, { message: 'Marca deve conter no mínimo 2 caracteres' })
  brand: string;
}
