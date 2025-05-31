import { Injectable, Logger } from '@nestjs/common';
import { DriverRepository } from '../repositories/driver.repository';
import { CreateDriverDto } from '../../dtos/create-driver.dto';
import { Driver } from '../../entities/driver.entity';
import { UpdateDriverDto } from '../../dtos/update-driver.dto';
import { DriverNotFoundException } from '../../exceptions/driver.exception';
import { FindAllDriversQueryDto } from '../../dtos/find-all-drivers-query.dto';
import { filterResultsWithQuery } from 'src/shared/utils/filterResultsWithQuery.util';

@Injectable()
export class DriverService {
  private readonly logger = new Logger(DriverService.name);

  constructor(private readonly driverRepository: DriverRepository) {}

  findAll(filters?: FindAllDriversQueryDto): Driver[] {
    this.logger.log(
      `Starting findAll with filters: ${JSON.stringify(filters)}`,
    );

    let driversResult = this.driverRepository.findAll();

    if (filters) {
      driversResult = filterResultsWithQuery(driversResult, filters);
    }

    this.logger.log(
      `Completed findAll - found ${driversResult.length} drivers`,
    );

    return driversResult;
  }

  findById(id: string): Driver | undefined {
    this.logger.log(`Starting findById with ID: ${id}`);

    const driver = this.driverRepository.findById(id);

    if (!driver) {
      this.logger.log(`Failed findById - Driver with ID ${id} not found`);
      throw new DriverNotFoundException();
    }

    this.logger.log(`Completed findById - Found driver with ID: ${id}`);

    return driver;
  }

  create(createDriverData: CreateDriverDto): Driver {
    this.logger.log(`Starting create`);

    const newDriver = this.driverRepository.create(createDriverData);

    this.logger.log(
      `Completed create - Driver created with ID: ${newDriver.id}`,
    );

    return newDriver;
  }

  update(id: string, updateDriverData: UpdateDriverDto): Driver | undefined {
    this.logger.log(`Starting update with ID: ${id}`);

    const updatedDriver = this.driverRepository.update(id, updateDriverData);

    if (!updatedDriver) {
      this.logger.log(`Failed update - Driver with ID ${id} not found`);
      throw new DriverNotFoundException();
    }

    this.logger.log(
      `Completed update - Driver with ID ${id} updated successfully`,
    );

    return updatedDriver;
  }

  delete(id: string): void {
    this.logger.log(`Starting delete with ID: ${id}`);

    const deletedDriver = this.driverRepository.delete(id);

    if (!deletedDriver) {
      this.logger.log(`Failed delete - Driver with ID ${id} not found`);
      throw new DriverNotFoundException();
    }

    this.logger.log(
      `Completed delete - Driver with ID ${id} deleted successfully`,
    );
  }
}
