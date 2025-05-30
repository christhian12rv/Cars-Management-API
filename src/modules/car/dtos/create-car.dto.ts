import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: 'Placa do automóvel',
    minLength: 7,
    maxLength: 7,
    example: 'OTM2A20',
  })
  @Length(7, 7, { message: 'Placa deve conter 7 caracteres' })
  @IsString({ message: 'Placa deve ser uma string' })
  @IsNotEmpty({ message: 'Placa é obrigatório' })
  plate: string;

  @ApiProperty({
    description: 'Cor do automóvel',
    minLength: 2,
    example: 'Vermelho',
  })
  @MinLength(2, { message: 'Cor deve conter no mínimo 2 caracteres' })
  @IsString({ message: 'Cor deve ser uma string' })
  @IsNotEmpty({ message: 'Cor é obrigatório' })
  color: string;

  @ApiProperty({
    description: 'Marca do automóvel',
    minLength: 2,
    example: 'Chevrolet',
  })
  @MinLength(2, { message: 'Marca deve conter no mínimo 2 caracteres' })
  @IsString({ message: 'Marca deve ser uma string' })
  @IsNotEmpty({ message: 'Marca é obrigatório' })
  brand: string;
}
