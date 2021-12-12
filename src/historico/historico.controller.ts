import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Post()
  create(@Body() createHistoricoDto: CreateHistoricoDto) {
    return this.historicoService.create(createHistoricoDto);
  }

  @Get()
  findAll() {
    return this.historicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoricoDto: UpdateHistoricoDto) {
    return this.historicoService.update(+id, updateHistoricoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoService.remove(+id);
  }
}
