import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { CarUsageService } from '../services/car-usage.service';
import { CreateCarUsageDto } from '../../dtos/create-car-usage.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarUsage } from '../../entities/car-usage.entity';
import { FinishCarUsageDto } from '../../dtos/finish-car-usage.dto';

@ApiTags('Utilização de automóveis')
@Controller('car-usage')
export class CarUsageController {
  constructor(private readonly carUsageService: CarUsageService) {}

  @ApiOperation({
    summary: 'Buscar todos os registros de utilização de automóveis',
  })
  @ApiResponse({
    status: 200,
    description: 'Registros de utilização de automóveis encontrados',
    type: [CarUsage],
  })
  @Get()
  findAll() {
    return this.carUsageService.findAll();
  }

  @ApiOperation({
    summary: 'Criar um novo registro de utilização de automóvel',
  })
  @ApiResponse({
    status: 200,
    description: 'Registro de utilização de automóvel criado com sucesso',
    type: CarUsage,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @Post()
  create(@Body() carUsageData: CreateCarUsageDto) {
    return this.carUsageService.create(carUsageData);
  }

  @ApiOperation({
    summary: 'Finalizar a utilização de um automóvel por um motorista',
  })
  @ApiResponse({
    status: 200,
    description: 'Finalização de utilização do automóvel feita com sucesso',
    type: CarUsage,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @Put('/finish-usage')
  finishUsage(@Body() finishCarUsageData: FinishCarUsageDto) {
    return this.carUsageService.finishUsage(finishCarUsageData);
  }
}
