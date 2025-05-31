import { Test } from '@nestjs/testing';
import { Car } from 'src/modules/car/entities/car.entity';
import { FindAllCarsQueryDto } from 'src/modules/car/dtos/find-all-cars-query.dto';
import { CarService } from 'src/modules/car/infrastructure/services/car.service';
import { CarRepository } from 'src/modules/car/infrastructure/repositories/car.repository';
import { CarNotFoundException } from 'src/modules/car/exceptions/car.exception';
import { CreateCarDto } from 'src/modules/car/dtos/create-car.dto';

describe('CarService', () => {
  let carService: CarService;
  let carRepository: MockType<CarRepository>;

  const mockCar: Car = {
    id: '2ba33d17-c50b-4767-b9a2-c271e1c1cdde',
    plate: '1234ABC',
    color: 'Azul',
    brand: 'Chevrolet',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: CarRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get(CarRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(carService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cars when no filters are provided', () => {
      const cars = [mockCar];

      carRepository.findAll.mockReturnValue(cars);

      const result = carService.findAll();

      expect(result).toEqual(cars);
      expect(carRepository.findAll).toHaveBeenCalled();
    });

    it('should filter cars by color', () => {
      const cars = [
        mockCar,
        {
          ...mockCar,
          id: '9cfa6abc-c81f-4d71-9b19-20e39bc3c484',
          color: 'Vermelho',
        },
      ];

      carRepository.findAll.mockReturnValue(cars);

      const filters: FindAllCarsQueryDto = { color: 'Azul' };
      const result = carService.findAll(filters);

      expect(result).toEqual([mockCar]);
      expect(carRepository.findAll).toHaveBeenCalled();
    });

    it('should filter cars by brand', () => {
      const cars = [
        mockCar,
        {
          ...mockCar,
          id: '9cfa6abc-c81f-4d71-9b19-20e39bc3c484',
          brand: 'Ford',
        },
      ];

      carRepository.findAll.mockReturnValue(cars);

      const filters: FindAllCarsQueryDto = { brand: 'Chevrolet' };
      const result = carService.findAll(filters);

      expect(result).toEqual([mockCar]);
      expect(carRepository.findAll).toHaveBeenCalled();
    });

    it('should filter cars by multiple attributes', () => {
      const cars = [
        mockCar,
        {
          ...mockCar,
          id: 'toHaveBeenCalled',
          color: 'Vermelho',
          brand: 'Ford',
        },
      ];

      carRepository.findAll.mockReturnValue(cars);

      const filters: FindAllCarsQueryDto = {
        color: 'Azul',
        brand: 'Chevrolet',
      };
      const result = carService.findAll(filters);

      expect(result).toEqual([mockCar]);
      expect(carRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return car if found', () => {
      carRepository.findById.mockReturnValue(mockCar);

      const result = carService.findById(mockCar.id);

      expect(result).toEqual(mockCar);
      expect(carRepository.findById).toHaveBeenCalledWith(mockCar.id);
    });

    it('should throw CarNotFoundException if car not found', () => {
      carRepository.findById.mockReturnValue(undefined);

      expect(() => carService.findById('nonexistent-id')).toThrow(
        CarNotFoundException,
      );
      expect(carRepository.findById).toHaveBeenCalledWith('nonexistent-id');
    });
  });

  describe('create', () => {
    const createCarData: CreateCarDto = {
      plate: 'ABC1234',
      color: 'Preto',
      brand: 'Toyota',
    };
    it('should create and return the car', () => {
      const newCar: Car = {
        ...mockCar,
        ...createCarData,
      };

      carRepository.create.mockReturnValue(newCar);

      const result = carService.create(createCarData);

      expect(result).toEqual(newCar);
      expect(carRepository.create).toHaveBeenCalledWith(createCarData);
    });
  });

  describe('update', () => {
    it('should update and return the updated car', () => {
      const updateCarData = {
        color: 'Verde',
      };

      const carUpdated: Car = {
        ...mockCar,
        ...updateCarData,
      };

      carRepository.update.mockReturnValue(carUpdated);

      const result = carService.update(mockCar.id, updateCarData);

      expect(result).toEqual(carUpdated);
      expect(carRepository.update).toHaveBeenCalledWith(
        mockCar.id,
        updateCarData,
      );
    });

    it('should throw CarNotFoundException if car not found', () => {
      const updateCarData = {
        color: 'Verde',
      };

      carRepository.update.mockReturnValue(undefined);

      expect(() => carService.update('nonexistent-id', updateCarData)).toThrow(
        CarNotFoundException,
      );

      expect(carRepository.update).toHaveBeenCalledWith(
        'nonexistent-id',
        updateCarData,
      );
    });
  });

  describe('delete', () => {
    it('should call delete and not throw if successful', () => {
      carRepository.delete.mockReturnValue(true);

      expect(() => carService.delete(mockCar.id)).not.toThrow();
      expect(carRepository.delete).toHaveBeenCalledWith(mockCar.id);
    });

    it('should throw CarNotFoundException if car not found', () => {
      carRepository.delete.mockReturnValue(false);

      expect(() => carService.delete('nonexistent-id')).toThrow(
        CarNotFoundException,
      );
      expect(carRepository.delete).toHaveBeenCalledWith('nonexistent-id');
    });
  });
});
