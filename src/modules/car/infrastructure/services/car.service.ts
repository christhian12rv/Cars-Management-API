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

  constructor(private readonly carRepo: CarRepository) {}

  findAll(filters?: FindAllCarsQueryDto): Car[] {
    this.logger.log(
      `Starting findAll with filters: ${JSON.stringify(filters)}`,
    );

    const cars = this.carRepo.findAll(filters);

    this.logger.log(`Completed findAll - found ${cars.length} cars`);

    return cars;
  }

  findById(id: string): Car | undefined {
    this.logger.log(`Starting findById with ID: ${id}`);

    const car = this.carRepo.findById(id);

    if (!car) {
      this.logger.log(`Failed findById - Car with ID ${id} not found`);
      throw new CarNotFoundException();
    }

    this.logger.log(`Completed findById - Found car with ID: ${id}`);
    return car;
  }

  create(dto: CreateCarDto): Car {
    this.logger.log(`Starting create`);

    const car = this.carRepo.create(dto);

    this.logger.log(`Completed create - Car created with ID: ${car.id}`);
    return car;
  }

  update(id: string, dto: UpdateCarDto): Car | undefined {
    this.logger.log(`Starting update with ID: ${id}`);

    const carUpdated = this.carRepo.update(id, dto);

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

    const carDeleted = this.carRepo.delete(id);

    if (!carDeleted) {
      this.logger.log(`Failed delete - Car with ID ${id} not found`);
      throw new CarNotFoundException();
    }

    this.logger.log(
      `Completed delete - Car with ID ${id} deleted successfully`,
    );
  }
}
