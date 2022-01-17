import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';

import { NumberValidationPipe } from 'src/common/pipes/number-validation.pipe';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly usuariosService: ClientesService) { }

  @Delete(':id')
  remove(@Param('id', NumberValidationPipe, ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', NumberValidationPipe, ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', NumberValidationPipe, ParseIntPipe) id: number, @Body(ValidationPipe) updateUsuarioDto: UpdateClienteDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Post()
  create(@Body(ValidationPipe) createUsuarioDto: CreateClienteDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
}
