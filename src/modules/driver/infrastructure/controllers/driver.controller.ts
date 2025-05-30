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
import { DriverService } from '../services/driver.service';
import { CreateDriverDto } from '../../dtos/create-driver.dto';
import { UpdateDriverDto } from '../../dtos/update-driver.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Driver } from '../../entities/driver.entity';
import { FindAllDriversQueryDto } from '../../dtos/find-all-drivers-query.dto';

@ApiTags('Motoristas')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Buscar todos os motoristas' })
  @ApiResponse({
    status: 200,
    description: 'Motoristas encontrados',
    type: [Driver],
  })
  @Get()
  findAll(@Query() filters: FindAllDriversQueryDto) {
    return this.driverService.findAll(filters);
  }

  @ApiOperation({ summary: 'Buscar um motorista pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Motorista encontrado',
    type: Driver,
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }

  @ApiOperation({ summary: 'Criar um novo motorista' })
  @ApiResponse({
    status: 200,
    description: 'Motorista criado com sucesso',
    type: Driver,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @Post()
  create(@Body() dto: CreateDriverDto) {
    return this.driverService.create(dto);
  }

  @ApiOperation({ summary: 'Modificar um motorista existente' })
  @ApiResponse({
    status: 200,
    description: 'Motorista modificado com sucesso',
    type: Driver,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDriverDto) {
    return this.driverService.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletar um motorista existente pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Motorista deletado com sucesso',
    type: Driver,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
