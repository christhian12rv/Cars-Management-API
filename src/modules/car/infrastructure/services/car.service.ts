import { Injectable, Logger } from '@nestjs/common';
import { CarRepository } from '../repositories/car.repository';
import { CreateCarDto } from '../../dtos/create-car.dto';
import { Car } from '../../entities/car.entity';
import { UpdateCarDto } from '../../dtos/update-car.dto';
import { CarNotFoundException } from '../../exceptions/car.exception';
import { FindAllCarsQueryDto } from '../../dtos/find-all-cars-query.dto';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);

  constructor(private readonly carRepository: CarRepository) {}

  findAll(filters?: FindAllCarsQueryDto): Car[] {
    this.logger.log(
      `Starting findAll with filters: ${JSON.stringify(filters)}`,
    );

    let carsResult = this.carRepository.findAll();

    if (filters && carsResult.length) {
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;

        carsResult = carsResult.filter((car) => {
          const carValue = car[key as keyof Car];
          return (
            typeof carValue === 'string' &&
            typeof value === 'string' &&
            carValue.toLowerCase() === value.toLowerCase()
          );
        });
      }
    }

    this.logger.log(`Completed findAll - found ${carsResult.length} cars`);

    return carsResult;
  }

  findById(id: string): Car | undefined {
    this.logger.log(`Starting findById with ID: ${id}`);

    const existingCar = this.carRepository.findById(id);

    if (!existingCar) {
      this.logger.log(`Failed findById - Car with ID ${id} not found`);
      throw new CarNotFoundException();
    }

    this.logger.log(`Completed findById - Found car with ID: ${id}`);
    return existingCar;
  }

  create(createCarData: CreateCarDto): Car {
    this.logger.log(`Starting create`);

    const car = this.carRepository.create(createCarData);

    this.logger.log(`Completed create - Car created with ID: ${car.id}`);
    return car;
  }

  update(id: string, updateCarData: UpdateCarDto): Car | undefined {
    this.logger.log(`Starting update with ID: ${id}`);

    const carUpdated = this.carRepository.update(id, updateCarData);

    if (!carUpdated) {
      this.logger.log(`Failed update - Car with ID ${id} not found`);
      throw new CarNotFoundException();
    }

    this.logger.log(
      `Completed update - Car with ID ${id} updated successfully`,
    );
    return carUpdated;
  }

  remove(id: string): void {
    this.logger.log(`Starting delete with ID: ${id}`);

    const carDeleted = this.carRepository.delete(id);

    if (!carDeleted) {
      this.logger.log(`Failed delete - Car with ID ${id} not found`);
      throw new CarNotFoundException();
    }

    this.logger.log(
      `Completed delete - Car with ID ${id} deleted successfully`,
    );
  }
}
