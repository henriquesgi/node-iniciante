import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';

import { StringValidationPipe } from 'src/common/pipes/string-validation.pipe';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) { }

  @Delete(':id')
  remove(@Param('id', StringValidationPipe) id: string) {
    return this.carrosService.remove(id);
  }

  @Get()
  findAll() {
    // findAll(): Promise<any[]> {
    return this.carrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', StringValidationPipe) id: string) {
    return this.carrosService.findOne(id);
  }

  @Patch()
  update(@Param('id', StringValidationPipe) id: string) {
    return this.carrosService.update(id);
  }

  @Post()
  create(@Body(ValidationPipe) createCarroDto: CreateCarroDto) {
    return this.carrosService.create(createCarroDto);
  }
}
