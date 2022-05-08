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
  Query,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PositivoValidationPipe } from 'src/common/pipes/positivo-validation.pipe';

import { CreateHistoricoDto } from './dto/create-historico.dto';
import { HistoricoService } from './historico.service';


@Controller('historico')
@ApiBearerAuth()
@ApiTags('Histórico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) { }

  @Get()
  @ApiQuery({ name: 'pagina' })
  @ApiResponse({ status: 200, description: 'Array contendo todas as representações.' })
  async findAll(@Query('pagina', PositivoValidationPipe) pagina: number) {
    return await this.historicoService.findAll(pagina);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
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
