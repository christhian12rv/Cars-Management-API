import { Injectable } from '@nestjs/common';
import { Car } from '../../entities/car.entity';
import { CreateCarDto } from '../../dtos/create-car.dto';
import { UpdateCarDto } from '../../dtos/update-car.dto';
import { FindAllCarsQueryDto } from '../../dtos/find-all-cars-query.dto';

@Injectable()
export class CarRepository {
  private cars = new Map<string, Car>();

  findAll(filters?: FindAllCarsQueryDto): Car[] {
    let carsResult = Array.from(this.cars.values());

    if (filters?.color) {
      carsResult = carsResult.filter(
        (c) => c.color.toLowerCase() === filters.color?.toLowerCase(),
      );
    }

    if (filters?.brand) {
      carsResult = carsResult.filter(
        (c) => c.brand.toLowerCase() === filters.brand?.toLowerCase(),
      );
    }

    return carsResult;
  }

  findById(id: string): Car | undefined {
    return this.cars.get(id);
  }

  create(carData: CreateCarDto): Car {
    const newCar = Object.assign(new Car(), carData);
    this.cars.set(newCar.id, newCar);
    return newCar;
  }

  update(id: string, carData: UpdateCarDto): Car | undefined {
    const existingCar = this.cars.get(id);

    if (!existingCar) {
      return undefined;
    }

    const carUpdated = Object.assign(existingCar, carData);
    this.cars.set(id, carUpdated);
    return carUpdated;
  }

  delete(id: string): boolean {
    return this.cars.delete(id);
  }
}
