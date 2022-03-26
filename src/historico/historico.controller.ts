import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateHistoricoDto } from './dto/create-historico.dto';
import { HistoricoService } from './historico.service';


@Controller('historico')
@ApiBearerAuth()
@ApiTags('Histórico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Array contendo todas as representações.' })
  findAll() {
    return this.historicoService.findAll();
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Representação modificada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 404, description: 'Representação não encontrada.' })
  async update(@Param('id', ParseIntPipe) id: number) {
    const request = await this.historicoService.update(id);
    if (request === 0) {
      throw new NotFoundException()
    }
  }

  @Post()
  @ApiBody({ type: CreateHistoricoDto })
  @ApiResponse({ status: 201, description: 'Representação criada.' })
  @ApiResponse({ status: 400, description: 'Representação inválida.' })
  @ApiResponse({ status: 422, description: 'Representação com valores inválidos.' })
  async create(@Body(ValidationPipe) historico: CreateHistoricoDto) {
    const request = await this.historicoService.create(historico);
    switch (request) {
      case '22003':
        throw new UnprocessableEntityException('Precisão fora do limite p(6,2).')
      case '23503':
        throw new UnprocessableEntityException('Violação de chave estrangeira.')
      default:
        break;
    }
  }
}
