import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';
import { HistoricoService } from './historico.service';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) { }

  @Get()
  findAll() {
    return this.historicoService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoricoDto: UpdateHistoricoDto) {
    return this.historicoService.update(+id, updateHistoricoDto);
  }

  @Post()
  create(@Body() createHistoricoDto: CreateHistoricoDto) {
    return this.historicoService.create(createHistoricoDto);
  }
}
