import { Module } from '@nestjs/common';
import { DriverController } from './infrastructure/controllers/driver.controller';
import { DriverRepository } from './infrastructure/repositories/driver.repository';
import { DriverService } from './infrastructure/services/driver.service';

@Module({
  controllers: [DriverController],
  providers: [DriverRepository, DriverService],
  exports: [DriverRepository],
})
export class DriverModule {}
