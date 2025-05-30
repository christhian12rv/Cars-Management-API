import { Module } from '@nestjs/common';
import { CarController } from './infrastructure/controllers/car.controller';
import { CarRepository } from './infrastructure/repositories/car.repository';
import { CarService } from './infrastructure/services/car.service';

@Module({
  controllers: [CarController],
  providers: [CarRepository, CarService],
  exports: [CarRepository],
})
export class CarModule {}
