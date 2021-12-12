import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';

@Injectable()
export class CarrosService {
  create(createCarroDto: CreateCarroDto) {
    return 'This action adds a new carro';
  }

  findAll() {
    return `This action returns all carros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carro`;
  }

  update(id: number, updateCarroDto: UpdateCarroDto) {
    return `This action updates a #${id} carro`;
  }

  remove(id: number) {
    return `This action removes a #${id} carro`;
  }
}
