import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PlacaValidationPipe } from 'src/common/pipes/placa-validation.pipe';
import { PositivoValidationPipe } from 'src/common/pipes/positivo-validation.pipe';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';

@Controller('carros')
@ApiBearerAuth()
@ApiTags('Carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) { }

  @Delete(':placa')
  @ApiParam({ name: 'placa' })
  @ApiResponse({ status: 200, description: 'Representação excluída.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 404, description: 'Representação não encontrada.' })
  async remove(@Param('placa', PlacaValidationPipe) placa: string) {
    const request = await this.carrosService.remove(placa);
    if (request === 0) {
      throw new NotFoundException()
    }
  }

  @Get()
  @ApiQuery({ name: 'pagina' })
  @ApiResponse({ status: 200, description: 'Array contendo todas as representações.' })
  async findAll(@Query('pagina', PositivoValidationPipe) pagina: number) {
    return await this.carrosService.findAll(pagina);
  }

  @Get(':placa')
  @ApiParam({ name: 'placa' })
  @ApiResponse({ status: 200, description: 'Representação encontrada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 404, description: 'Representação não encontrada.' })
  async findOne(@Param('placa', PlacaValidationPipe) placa: string) {
    const request = await this.carrosService.findOne(placa);
    if (!request) {
      throw new NotFoundException()
    }
    return request
  }

  @Patch(':placa')
  @ApiBody({ schema: { type: 'object', properties: { alugado: { type: 'boolean' } } } })
  @ApiParam({ name: 'placa' })
  @ApiResponse({ status: 200, description: 'Representação modificada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 404, description: 'Representação não encontrada.' })
  async update(
    @Body('alugado', ParseBoolPipe) alugado: boolean,
    @Param('placa', PlacaValidationPipe) placa: string
  ) {
    const request = await this.carrosService.update(placa, alugado);
    if (request === 0) {
      throw new NotFoundException()
    }
  }

  @Post()
  @ApiBody({ type: CreateCarroDto })
  @ApiResponse({ status: 201, description: 'Representação criada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 409, description: 'Representação já existe.' })
  async create(@Body(ValidationPipe) carro: CreateCarroDto) {
    const request = await this.carrosService.create(carro);
    switch (request) {
      case '23505':
        throw new ConflictException()
      default:
        break;
    }
  }
}
