import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';

import { CreateHistoricoDto } from './dto/create-historico.dto';
import { HistoricoService } from './historico.service';


@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) { }

  @Get()
  findAll() {
    return this.historicoService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.historicoService.update(id);
  }

  @Post()
  create(@Body(ValidationPipe) historico: CreateHistoricoDto) {
    return this.historicoService.create(historico);
  }
}
