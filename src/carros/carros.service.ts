import { Injectable } from '@nestjs/common';
import { CreateCarroDto } from './dto/create-carro.dto';

@Injectable()
export class CarrosService {
  create(createCarroDto: CreateCarroDto) {
    return 'This action adds a new carro';
  }

  findAll() {
    return `This action returns all carros`;
  }

  findOne(id: string) {
    return `This action returns a #${id} carro`;
  }

  remove(id: string) {
    return `This action removes a #${id} carro`;
  }
}
