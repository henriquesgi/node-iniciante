import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TesteStringValidationPipe } from 'src/common/pipes/teste-string.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) { }

  @Post()
  create(@Body(ValidationPipe) createCarroDto: CreateCarroDto) {
    return this.carrosService.create(createCarroDto);
  }

  @Get()
  // findAll(): Promise<any[]> {
  findAll() {
    return this.carrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', TesteStringValidationPipe) id: string) {
    return this.carrosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', TesteStringValidationPipe) id: string) {
    return this.carrosService.remove(id);
  }
}
