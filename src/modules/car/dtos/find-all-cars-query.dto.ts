import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindAllCarsQueryDto {
  @ApiPropertyOptional({
    description: 'Cor do automóvel',
    minLength: 2,
    example: 'Vermelho',
  })
  @IsOptional()
  @IsString({ message: 'Cor deve ser uma string' })
  @MinLength(2, { message: 'Cor deve conter no mínimo 2 caracteres' })
  color?: string;

  @ApiPropertyOptional({
    description: 'Marca do automóvel',
    minLength: 2,
    example: 'Chevrolet',
  })
  @IsOptional()
  @IsString({ message: 'Marca deve ser uma string' })
  @MinLength(2, { message: 'Marca deve conter no mínimo 2 caracteres' })
  brand?: string;
}
