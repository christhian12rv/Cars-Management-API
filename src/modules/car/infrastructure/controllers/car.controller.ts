import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CarService } from '../services/car.service';
import { CreateCarDto } from '../../dtos/create-car.dto';
import { UpdateCarDto } from '../../dtos/update-car.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from '../../entities/car.entity';
import { FindAllCarsQueryDto } from '../../dtos/find-all-cars-query.dto';

@ApiTags('Automóveis')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Buscar todos os automóveis' })
  @ApiResponse({
    status: 200,
    description: 'Automóveis encontrados',
    type: [Car],
  })
  @Get()
  findAll(@Query() filters: FindAllCarsQueryDto) {
    return this.carService.findAll(filters);
  }

  @ApiOperation({ summary: 'Buscar um automóvel pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Automóvel encontrado',
    type: Car,
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.carService.findById(id);
  }

  @ApiOperation({ summary: 'Criar um novo automóvel' })
  @ApiResponse({
    status: 200,
    description: 'Automóvel criado com sucesso',
    type: Car,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @Post()
  create(@Body() dto: CreateCarDto) {
    return this.carService.create(dto);
  }

  @ApiOperation({ summary: 'Modificar um automóvel existente' })
  @ApiResponse({
    status: 200,
    description: 'Automóvel modificado com sucesso',
    type: Car,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    return this.carService.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletar um automóvel existente pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Automóvel deletado com sucesso',
    type: Car,
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.carService.delete(id);
  }
}
