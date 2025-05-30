import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { DriverModule } from './modules/driver/driver.module';
import { CarUsageModule } from './modules/car-usage/car-usage.module';

@Module({
  imports: [CarModule, CarUsageModule, DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
