import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';

import { PlacaValidationPipe } from 'src/common/pipes/placa-validation.pipe';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) { }

  @Delete(':placa')
  remove(@Param('placa', PlacaValidationPipe) placa: string) {
    return this.carrosService.remove(placa);
  }

  @Get()
  findAll() {
    return this.carrosService.findAll();
  }

  @Get(':placa')
  findOne(@Param('placa', PlacaValidationPipe) placa: string) {
    return this.carrosService.findOne(placa);
  }

  @Patch(':placa')
  update(
    @Param('placa', PlacaValidationPipe) placa: string,
    @Body('alugado', ParseBoolPipe) alugado: boolean
  ) {
    return this.carrosService.update(placa, alugado);
  }

  @Post()
  create(@Body(ValidationPipe) carro: CreateCarroDto) {
    return this.carrosService.create(carro);
  }
}
