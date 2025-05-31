import { Test } from '@nestjs/testing';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { FindAllDriversQueryDto } from 'src/modules/driver/dtos/find-all-drivers-query.dto';
import { DriverService } from 'src/modules/driver/infrastructure/services/driver.service';
import { DriverRepository } from 'src/modules/driver/infrastructure/repositories/driver.repository';
import { DriverNotFoundException } from 'src/modules/driver/exceptions/driver.exception';
import { CreateDriverDto } from 'src/modules/driver/dtos/create-driver.dto';

describe('DriverService', () => {
  let driverService: DriverService;
  let driverRepository: MockType<DriverRepository>;

  const mockDriver: Driver = {
    id: '2ba33d17-c50b-4767-b9a2-c271e1c1cdde',
    name: 'John Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: DriverRepository,
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

    driverService = module.get<DriverService>(DriverService);
    driverRepository = module.get(DriverRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(driverService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all drivers when no filters are provided', () => {
      const drivers = [mockDriver];

      driverRepository.findAll.mockReturnValue(drivers);

      const result = driverService.findAll();

      expect(result).toEqual(drivers);
      expect(driverRepository.findAll).toHaveBeenCalled();
    });

    it('should filter drivers by name', () => {
      const drivers = [
        mockDriver,
        {
          ...mockDriver,
          id: '9cfa6abc-c81f-4d71-9b19-20e39bc3c484',
          name: 'Pedro Silva',
        },
      ];

      driverRepository.findAll.mockReturnValue(drivers);

      const filters: FindAllDriversQueryDto = { name: 'John Doe' };
      const result = driverService.findAll(filters);

      expect(result).toEqual([mockDriver]);
      expect(driverRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return driver if found', () => {
      driverRepository.findById.mockReturnValue(mockDriver);

      const result = driverService.findById(mockDriver.id);

      expect(result).toEqual(mockDriver);
      expect(driverRepository.findById).toHaveBeenCalledWith(mockDriver.id);
    });

    it('should throw DriverNotFoundException if driver not found', () => {
      driverRepository.findById.mockReturnValue(undefined);

      expect(() => driverService.findById('nonexistent-id')).toThrow(
        DriverNotFoundException,
      );
      expect(driverRepository.findById).toHaveBeenCalledWith('nonexistent-id');
    });
  });

  describe('create', () => {
    const createDriverData: CreateDriverDto = {
      name: 'Maria Santos',
    };

    it('should create and return the driver', () => {
      const newDriver: Driver = {
        ...mockDriver,
        ...createDriverData,
      };

      driverRepository.create.mockReturnValue(newDriver);

      const result = driverService.create(createDriverData);

      expect(result).toEqual(newDriver);
      expect(driverRepository.create).toHaveBeenCalledWith(createDriverData);
    });
  });

  describe('update', () => {
    it('should update and return the updated driver', () => {
      const updateDriverData = {
        name: 'Maria Santos',
      };

      const driverUpdated: Driver = {
        ...mockDriver,
        ...updateDriverData,
      };

      driverRepository.update.mockReturnValue(driverUpdated);

      const result = driverService.update(mockDriver.id, updateDriverData);

      expect(result).toEqual(driverUpdated);
      expect(driverRepository.update).toHaveBeenCalledWith(
        mockDriver.id,
        updateDriverData,
      );
    });

    it('should throw DriverNotFoundException if driver not found', () => {
      const updateDriverData = {
        name: 'Maria Santos',
      };

      driverRepository.update.mockReturnValue(undefined);

      expect(() =>
        driverService.update('nonexistent-id', updateDriverData),
      ).toThrow(DriverNotFoundException);

      expect(driverRepository.update).toHaveBeenCalledWith(
        'nonexistent-id',
        updateDriverData,
      );
    });
  });

  describe('delete', () => {
    it('should call delete and not throw if successful', () => {
      driverRepository.delete.mockReturnValue(true);

      expect(() => driverService.delete(mockDriver.id)).not.toThrow();
      expect(driverRepository.delete).toHaveBeenCalledWith(mockDriver.id);
    });

    it('should throw DriverNotFoundException if driver not found', () => {
      driverRepository.delete.mockReturnValue(false);

      expect(() => driverService.delete('nonexistent-id')).toThrow(
        DriverNotFoundException,
      );
      expect(driverRepository.delete).toHaveBeenCalledWith('nonexistent-id');
    });
  });
});
