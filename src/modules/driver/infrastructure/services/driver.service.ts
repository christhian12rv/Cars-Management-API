import { Injectable, Logger } from '@nestjs/common';
import { DriverRepository } from '../repositories/driver.repository';
import { CreateDriverDto } from '../../dtos/create-driver.dto';
import { Driver } from '../../entities/driver.entity';
import { UpdateDriverDto } from '../../dtos/update-driver.dto';
import { DriverNotFoundException } from '../../exceptions/driver.exception';
import { FindAllDriversQueryDto } from '../../dtos/find-all-drivers-query.dto';

@Injectable()
export class DriverService {
  private readonly logger = new Logger(DriverService.name);

  constructor(private readonly driverRepository: DriverRepository) {}

  findAll(filters?: FindAllDriversQueryDto): Driver[] {
    this.logger.log(
      `Starting findAll with filters: ${JSON.stringify(filters)}`,
    );

    let driversResult = this.driverRepository.findAll();

    if (filters && driversResult.length) {
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;

        driversResult = driversResult.filter((driver) => {
          const driverValue = driver[key as keyof Driver];
          return (
            typeof driverValue === 'string' &&
            typeof value === 'string' &&
            driverValue.toLowerCase() === value.toLowerCase()
          );
        });
      }
    }

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

    const driver = this.driverRepository.create(createDriverData);

    this.logger.log(`Completed create - Driver created with ID: ${driver.id}`);
    return driver;
  }

  update(id: string, updateDriverData: UpdateDriverDto): Driver | undefined {
    this.logger.log(`Starting update with ID: ${id}`);

    const driverUpdated = this.driverRepository.update(id, updateDriverData);

    if (!driverUpdated) {
      this.logger.log(`Failed update - Driver with ID ${id} not found`);
      throw new DriverNotFoundException();
    }

    this.logger.log(
      `Completed update - Driver with ID ${id} updated successfully`,
    );
    return driverUpdated;
  }

  remove(id: string): void {
    this.logger.log(`Starting delete with ID: ${id}`);

    const driverDeleted = this.driverRepository.delete(id);

    if (!driverDeleted) {
      this.logger.log(`Failed delete - Driver with ID ${id} not found`);
      throw new DriverNotFoundException();
    }

    this.logger.log(
      `Completed delete - Driver with ID ${id} deleted successfully`,
    );
  }
}
