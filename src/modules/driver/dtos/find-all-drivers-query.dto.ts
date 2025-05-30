import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindAllDriversQueryDto {
  @ApiPropertyOptional({
    description: 'Nome do motorista',
    minLength: 2,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(2, { message: 'Nome deve conter no mínimo 2 caracteres' })
  name?: string;
}
