import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CnhValidationPipe } from 'src/common/pipes/cnh-validation.pipe';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
@ApiBearerAuth()
@ApiTags('Clientes')
export class ClientesController {
  constructor(private readonly usuariosService: ClientesService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Array contendo todas as representações.' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':cnh')
  @ApiParam({ name: 'cnh', type: Number })
  @ApiResponse({ status: 200, description: 'Representação encontrada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 404, description: 'Representação não encontrada.' })
  async findOne(@Param('cnh', CnhValidationPipe, ParseIntPipe) cnh: number) {
    const request = await this.usuariosService.findOne(cnh);
    if (!request) {
      throw new NotFoundException()
    }
    return request
  }

  @Post()
  @ApiBody({ type: CreateClienteDto })
  @ApiResponse({ status: 201, description: 'Representação criada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 409, description: 'Representação já existe.' })
  async create(@Body(ValidationPipe) usuario: CreateClienteDto) {
    const request = await this.usuariosService.create(usuario);
    switch (request) {
      case '23505':
        throw new ConflictException()
      default:
        break;
    }
  }
}
