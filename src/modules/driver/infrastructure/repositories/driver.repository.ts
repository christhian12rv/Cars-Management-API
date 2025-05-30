import { Injectable } from '@nestjs/common';
import { Driver } from '../../entities/driver.entity';
import { CreateDriverDto } from '../../dtos/create-driver.dto';
import { UpdateDriverDto } from '../../dtos/update-driver.dto';

@Injectable()
export class DriverRepository {
  private drivers = new Map<string, Driver>();

  findAll(): Driver[] {
    return Array.from(this.drivers.values());
  }

  findById(id: string): Driver | undefined {
    return this.drivers.get(id);
  }

  create(driverData: CreateDriverDto): Driver {
    const newDriver = Object.assign(new Driver(), driverData);
    this.drivers.set(newDriver.id, newDriver);
    return newDriver;
  }

  update(id: string, driverData: UpdateDriverDto): Driver | undefined {
    const existingDriver = this.findById(id);

    if (!existingDriver) {
      return undefined;
    }

    const driverUpdated = Object.assign(existingDriver, driverData);
    this.drivers.set(id, driverUpdated);
    return driverUpdated;
  }

  delete(id: string): boolean {
    return this.drivers.delete(id);
  }
}
