import { Module } from '@nestjs/common';
import { CarUsageController } from './infrastructure/controllers/car-usage.controller';
import { CarUsageRepository } from './infrastructure/repositories/car-usage.repository';
import { CarUsageService } from './infrastructure/services/car-usage.service';
import { DriverModule } from '../driver/driver.module';
import { CarModule } from '../car/car.module';

@Module({
  controllers: [CarUsageController],
  providers: [CarUsageRepository, CarUsageService],
  imports: [DriverModule, CarModule],
  exports: [],
})
export class CarUsageModule {}
