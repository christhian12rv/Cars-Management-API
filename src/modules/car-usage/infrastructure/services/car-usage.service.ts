import { Injectable, Logger } from '@nestjs/common';
import { CarUsageRepository } from '../repositories/car-usage.repository';
import { CreateCarUsageDto } from '../../dtos/create-car-usage.dto';
import { CarUsage } from '../../entities/car-usage.entity';
import {
  CarIsCurrentlyInUseException,
  CarUsageNotFoundException,
  DriverIsAlreadyUsingACarCurrentlyException,
} from '../../exceptions/car-usage.exception';
import { CarUsageResponseDto } from '../../dtos/car-usage-response.dto';
import { DriverRepository } from 'src/modules/driver/infrastructure/repositories/driver.repository';
import { CarRepository } from 'src/modules/car/infrastructure/repositories/car.repository';
import { DriverNotFoundException } from 'src/modules/driver/exceptions/driver.exception';
import { CarNotFoundException } from 'src/modules/car/exceptions/car.exception';
import { FinishCarUsageDto } from '../../dtos/finish-car-usage.dto';

@Injectable()
export class CarUsageService {
  private readonly logger = new Logger(CarUsageService.name);

  constructor(
    private readonly carUsageRepository: CarUsageRepository,
    private readonly driverRepository: DriverRepository,
    private readonly carRepository: CarRepository,
  ) {}

  findAll(): CarUsageResponseDto[] {
    this.logger.log(`Starting findAll`);

    const carUsagesResult = this.carUsageRepository.findAll();

    // Returns an array of CarUsageResponseDto containing driver and car data
    const carUsagesResponse: CarUsageResponseDto[] = carUsagesResult
      .map((carUsage) => {
        const driver = this.driverRepository.findById(carUsage.driverId);
        const car = this.carRepository.findById(carUsage.carId);

        if (!driver || !car) {
          return null;
        }

        return {
          id: carUsage.id,
          driver,
          car,
          reasonUse: carUsage.reasonUse,
          createdAt: carUsage.createdAt,
          updatedAt: carUsage.updatedAt,
          endedAt: carUsage.endedAt,
        };
      })
      .filter((carUsage) => carUsage !== null);

    this.logger.log(
      `Completed findAll - found ${carUsagesResponse.length} carUsages`,
    );

    return carUsagesResponse;
  }

  create(carUsageData: CreateCarUsageDto): CarUsage {
    this.logger.log(`Starting create`);

    const driver = this.driverRepository.findById(carUsageData.driverId);
    if (!driver) {
      this.logger.log(
        `Failed create - Driver with ID ${carUsageData.driverId} not found`,
      );
      throw new DriverNotFoundException();
    }

    const car = this.carRepository.findById(carUsageData.carId);
    if (!car) {
      this.logger.log(
        `Failed create - Car with ID ${carUsageData.carId} not found`,
      );
      throw new CarNotFoundException();
    }

    const carUsagesResult = this.carUsageRepository.findAll();

    const driverIsAlreadyUsingACarCurrently = carUsagesResult.some(
      (carUsage) =>
        carUsage.driverId === carUsageData.driverId && !carUsage.endedAt,
    );
    if (driverIsAlreadyUsingACarCurrently) {
      this.logger.log(
        `Failed create - Driver with ID ${carUsageData.driverId} is already using a car currently`,
      );
      throw new DriverIsAlreadyUsingACarCurrentlyException();
    }

    const carIsCurrentlyInUse = carUsagesResult.some(
      (carUsage) => carUsage.carId === carUsageData.carId && !carUsage.endedAt,
    );
    if (carIsCurrentlyInUse) {
      this.logger.log(
        `Failed create - Car with ID ${carUsageData.carId} is currently in use`,
      );
      throw new CarIsCurrentlyInUseException();
    }

    const carUsage = this.carUsageRepository.create(carUsageData);

    this.logger.log(
      `Completed create - CarUsage created with ID: ${carUsage.id}`,
    );

    return carUsage;
  }

  finishUsage(finishCarUsageData: FinishCarUsageDto): CarUsage {
    this.logger.log(
      `Starting finishUsage with driver ID ${finishCarUsageData.driverId} and car ID ${finishCarUsageData.carId}`,
    );

    const driver = this.driverRepository.findById(finishCarUsageData.driverId);

    if (!driver) {
      this.logger.log(
        `Failed finishUsage - Driver with ID ${finishCarUsageData.driverId} not found`,
      );
      throw new DriverNotFoundException();
    }

    const car = this.carRepository.findById(finishCarUsageData.carId);

    if (!car) {
      this.logger.log(
        `Failed finishUsage - Car with ID ${finishCarUsageData.carId} not found`,
      );
      throw new CarNotFoundException();
    }

    const carUsageUpdated = this.carUsageRepository.updateByDriverIdAndCarId(
      finishCarUsageData.driverId,
      finishCarUsageData.carId,
      { endedAt: new Date() },
    );

    if (!carUsageUpdated) {
      this.logger.log(
        `Failed finishUsage - Car Usage with driver ID ${finishCarUsageData.driverId} and Car ID ${finishCarUsageData.carId} not found`,
      );
      throw new CarUsageNotFoundException();
    }

    this.logger.log(
      `Completed finishUsage - Car Usage with driver ID ${finishCarUsageData.driverId} and car ID ${finishCarUsageData.carId} has finished successfully`,
    );

    return carUsageUpdated;
  }
}
