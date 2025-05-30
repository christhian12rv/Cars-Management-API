import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    description: 'Nome do motorista',
    minLength: 7,
    example: 'John Doe',
  })
  @MinLength(2, { message: 'Nome deve conter no mínimo 2 caracteres' })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;
}
