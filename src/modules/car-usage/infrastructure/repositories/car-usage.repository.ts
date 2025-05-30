import { Injectable } from '@nestjs/common';
import { CarUsage } from '../../entities/car-usage.entity';
import { CreateCarUsageDto } from '../../dtos/create-car-usage.dto';
import { UpdateCarUsageDto } from '../../dtos/update-car-usage.dto';

@Injectable()
export class CarUsageRepository {
  private carUsages = new Map<string, CarUsage>();

  constructor() {}

  findAll(): CarUsage[] {
    return Array.from(this.carUsages.values());
  }

  findByDriverIdAndCarId(
    driverId: string,
    carId: string,
  ): CarUsage | undefined {
    const carUsagesResult = this.findAll();

    return carUsagesResult.find(
      (carUsage) => carUsage.driverId === driverId && carUsage.carId === carId,
    );
  }

  create(carUsageData: CreateCarUsageDto): CarUsage {
    const newCarUsage = Object.assign(new CarUsage(), carUsageData);
    this.carUsages.set(newCarUsage.id, newCarUsage);
    return newCarUsage;
  }

  updateByDriverIdAndCarId(
    driverId: string,
    carId: string,
    updateCarUsageData: UpdateCarUsageDto,
  ): CarUsage | undefined {
    const carUsagesResult = this.findAll();

    const existingCarUsage = carUsagesResult.find(
      (carUsage) =>
        carUsage.driverId === driverId &&
        carUsage.carId === carId &&
        !carUsage.endedAt,
    );

    if (!existingCarUsage) {
      return undefined;
    }

    const carUsageUpdated = Object.assign(existingCarUsage, updateCarUsageData);
    this.carUsages.set(existingCarUsage.id, carUsageUpdated);
    return carUsageUpdated;
  }
}
