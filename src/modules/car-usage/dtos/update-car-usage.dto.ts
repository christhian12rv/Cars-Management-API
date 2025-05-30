import { PartialType } from '@nestjs/swagger';
import { CreateCarUsageDto } from './create-car-usage.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateCarUsageDto extends PartialType(CreateCarUsageDto) {
  @IsOptional()
  @IsDate()
  endedAt?: Date;
}
