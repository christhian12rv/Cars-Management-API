import { Test, TestingModule } from '@nestjs/testing';
import { DriverRepository } from 'src/modules/driver/infrastructure/repositories/driver.repository';
import { CarRepository } from 'src/modules/car/infrastructure/repositories/car.repository';
import { DriverNotFoundException } from 'src/modules/driver/exceptions/driver.exception';
import { CarNotFoundException } from 'src/modules/car/exceptions/car.exception';
import { CarUsageService } from 'src/modules/car-usage/infrastructure/services/car-usage.service';
import { CarUsageRepository } from 'src/modules/car-usage/infrastructure/repositories/car-usage.repository';
import { CreateCarUsageDto } from 'src/modules/car-usage/dtos/create-car-usage.dto';
import {
  CarIsCurrentlyInUseException,
  CarUsageNotFoundException,
  DriverIsAlreadyUsingACarCurrentlyException,
} from 'src/modules/car-usage/exceptions/car-usage.exception';
import { CarUsage } from 'src/modules/car-usage/entities/car-usage.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Car } from 'src/modules/car/entities/car.entity';
import { CarUsageResponseDto } from 'src/modules/car-usage/dtos/car-usage-response.dto';
import { FinishCarUsageDto } from 'src/modules/car-usage/dtos/finish-car-usage.dto';

describe('CarUsageService', () => {
  let carUsageService: CarUsageService;
  let carUsageRepository: MockType<CarUsageRepository>;
  let driverRepository: MockType<DriverRepository>;
  let carRepository: MockType<CarRepository>;

  const mockCarUsage: CarUsage = {
    id: 'cf4e2502-8e87-4e05-87a6-028399cbee31',
    driverId: '6686af5f-13ae-40a3-96cd-e6ea89f3f27d',
    carId: '517a2d04-e337-4487-9ed5-e3dc56aa125b',
    reasonUse: 'Viagem',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarUsageService,
        {
          provide: CarUsageRepository,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            updateByDriverIdAndCarId: jest.fn(),
          },
        },
        {
          provide: DriverRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: CarRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    carUsageService = module.get<CarUsageService>(CarUsageService);
    carUsageRepository = module.get(CarUsageRepository);
    driverRepository = module.get(DriverRepository);
    carRepository = module.get(CarRepository);
  });

  describe('findAll', () => {
    it('should return a list of CarUsageResponseDto', () => {
      const carUsages = [mockCarUsage];
      const driver: Driver = {
        id: mockCarUsage.driverId,
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const car: Car = {
        id: mockCarUsage.carId,
        plate: '1234ABC',
        color: 'Azul',
        brand: 'Chevrolet',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockResult: CarUsageResponseDto[] = [
        {
          id: mockCarUsage.id,
          reasonUse: mockCarUsage.reasonUse,
          driver,
          car,
          createdAt: mockCarUsage.createdAt,
          updatedAt: mockCarUsage.updatedAt,
        },
      ];

      carUsageRepository.findAll.mockReturnValue(carUsages);
      driverRepository.findById.mockReturnValue(driver);
      carRepository.findById.mockReturnValue(car);

      const result = carUsageService.findAll();

      expect(result).toEqual(mockResult);
      expect(carUsageRepository.findAll).toHaveBeenCalled();
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
      expect(result[0].driver).toBe(driver);
      expect(result[0].car).toBe(car);
    });

    it('should filter out invalid records (missing driver)', () => {
      const carUsages = [mockCarUsage];

      carUsageRepository.findAll.mockReturnValue(carUsages);
      driverRepository.findById.mockReturnValue(null);
      carRepository.findById.mockReturnValue({
        id: mockCarUsage.carId,
      });

      const result = carUsageService.findAll();

      expect(result).toHaveLength(0);
      expect(carUsageRepository.findAll).toHaveBeenCalled();
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
    });

    it('should filter out invalid records (missing car)', () => {
      const carUsages = [mockCarUsage];

      carUsageRepository.findAll.mockReturnValue(carUsages);
      driverRepository.findById.mockReturnValue({
        id: mockCarUsage.driverId,
      });
      carRepository.findById.mockReturnValue(null);

      const result = carUsageService.findAll();

      expect(result).toHaveLength(0);
      expect(carUsageRepository.findAll).toHaveBeenCalled();
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const carUsageCreateData: CreateCarUsageDto = {
      driverId: 'fddbb54b-349a-40fd-a517-2b95a8fed519',
      carId: '5e093322-8fbc-4541-b808-de2f5d56d7c5',
      reasonUse: 'Trabalho',
    };

    it('should throw if driver not found', () => {
      driverRepository.findById.mockReturnValue(null);

      expect(() => carUsageService.create(carUsageCreateData)).toThrow(
        DriverNotFoundException,
      );
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).not.toHaveBeenCalled();
    });

    it('should throw if car not found', () => {
      driverRepository.findById.mockReturnValue({
        id: carUsageCreateData.driverId,
      });
      carRepository.findById.mockReturnValue(null);

      expect(() => carUsageService.create(carUsageCreateData)).toThrow(
        CarNotFoundException,
      );
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
    });

    it('should throw if driver is already using a car', () => {
      driverRepository.findById.mockReturnValue({
        id: carUsageCreateData.driverId,
      });
      carRepository.findById.mockReturnValue({
        id: carUsageCreateData.carId,
      });
      carUsageRepository.findAll.mockReturnValue([
        {
          driverId: carUsageCreateData.driverId,
          carId: '5a38e036-7fa6-439f-b045-dab4b811bf0e',
        },
      ]);

      expect(() => carUsageService.create(carUsageCreateData)).toThrow(
        DriverIsAlreadyUsingACarCurrentlyException,
      );
      expect(carUsageRepository.findAll).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
      expect(driverRepository.findById).toHaveBeenCalled();
    });

    it('should throw if car is currently in use', () => {
      driverRepository.findById.mockReturnValue({
        id: carUsageCreateData.driverId,
      });
      carRepository.findById.mockReturnValue({
        id: carUsageCreateData.carId,
      });
      carUsageRepository.findAll.mockReturnValue([
        {
          driverId: 'b5031eee-6ce4-4314-abd6-98bfd0a492ad',
          carId: carUsageCreateData.carId,
        },
      ]);

      expect(() => carUsageService.create(carUsageCreateData)).toThrow(
        CarIsCurrentlyInUseException,
      );
      expect(carUsageRepository.findAll).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
      expect(driverRepository.findById).toHaveBeenCalled();
    });

    it('should create car usage successfully', () => {
      const newCarUsage: CarUsage = {
        ...mockCarUsage,
        ...carUsageCreateData,
      };

      driverRepository.findById.mockReturnValue({
        id: carUsageCreateData.driverId,
      });
      carRepository.findById.mockReturnValue({
        id: carUsageCreateData.carId,
      });
      carUsageRepository.findAll.mockReturnValue([]);
      carUsageRepository.create.mockReturnValue(newCarUsage);

      const result = carUsageService.create(carUsageCreateData);

      expect(result).toBe(newCarUsage);
      expect(carUsageRepository.create).toHaveBeenCalledWith(
        carUsageCreateData,
      );
      expect(carUsageRepository.findAll).toHaveBeenCalled();
      expect(carUsageRepository.create).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
      expect(driverRepository.findById).toHaveBeenCalled();
    });
  });

  describe('finishUsage', () => {
    const finishCarUsageData: FinishCarUsageDto = {
      driverId: '05251619-b820-4c4a-9118-5c56985c2e96',
      carId: '070e1df9-3362-4c5d-a01c-4b0470c79ec1',
    };

    it('should throw if driver not found', () => {
      driverRepository.findById.mockReturnValue(null);

      expect(() => carUsageService.finishUsage(finishCarUsageData)).toThrow(
        DriverNotFoundException,
      );
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).not.toHaveBeenCalled();
    });

    it('should throw if car not found', () => {
      driverRepository.findById.mockReturnValue({
        id: finishCarUsageData.driverId,
      });
      carRepository.findById.mockReturnValue(null);

      expect(() => carUsageService.finishUsage(finishCarUsageData)).toThrow(
        CarNotFoundException,
      );
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
    });

    it('should throw if car usage not found to update', () => {
      driverRepository.findById.mockReturnValue({
        id: finishCarUsageData.driverId,
      });
      carRepository.findById.mockReturnValue({
        id: finishCarUsageData.carId,
      });
      carUsageRepository.updateByDriverIdAndCarId.mockReturnValue(null);

      expect(() => carUsageService.finishUsage(finishCarUsageData)).toThrow(
        CarUsageNotFoundException,
      );
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
      expect(carUsageRepository.updateByDriverIdAndCarId).toHaveBeenCalled();
    });

    it('should finish car usage successfully', () => {
      const finishedUsage: CarUsage = {
        ...mockCarUsage,
        endedAt: new Date(),
      };
      driverRepository.findById.mockReturnValue({
        id: finishCarUsageData.driverId,
      });
      carRepository.findById.mockReturnValue({
        id: finishCarUsageData.carId,
      });
      carUsageRepository.updateByDriverIdAndCarId.mockReturnValue(
        finishedUsage,
      );

      const result = carUsageService.finishUsage(finishCarUsageData);

      expect(result).toEqual(finishedUsage);
      expect(driverRepository.findById).toHaveBeenCalled();
      expect(carRepository.findById).toHaveBeenCalled();
      expect(carUsageRepository.updateByDriverIdAndCarId).toHaveBeenCalled();
    });
  });
});
