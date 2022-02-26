import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe
} from '@nestjs/common';

import { CnhValidationPipe } from 'src/common/pipes/cnh-validation.pipe';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly usuariosService: ClientesService) { }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':cnh')
  findOne(@Param('cnh', CnhValidationPipe, ParseIntPipe) cnh: number) {
    return this.usuariosService.findOne(cnh);
  }

  @Post()
  create(@Body(ValidationPipe) usuario: CreateClienteDto) {
    return this.usuariosService.create(usuario);
  }
}
