import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CnhValidationPipe } from 'src/common/pipes/cnh-validation.pipe';
import { PositivoValidationPipe } from 'src/common/pipes/positivo-validation.pipe';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
@ApiBearerAuth()
@ApiTags('Clientes')
export class ClientesController {
  constructor(private readonly usuariosService: ClientesService) { }

  @Get()
  @ApiQuery({ name: 'pagina' })
  @ApiResponse({ status: 200, description: 'Array contendo todas as representações.' })
  async findAll(@Query('pagina', PositivoValidationPipe) pagina: number) {
    return await this.usuariosService.findAll(pagina);
  }

  @Get(':cnh')
  @ApiParam({ name: 'cnh' })
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
