import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarroDto } from './dto/create-carro.dto';
import { Carro } from './entities/carro.entity';

@Injectable()
export class CarrosService {
  constructor(
    @InjectRepository(Carro)
    private carroRepository: Repository<Carro>,
  ) { }

  async create(carro: CreateCarroDto): Promise<void> {
    await this.carroRepository.insert({ ...carro, alugado: false });
  }

  findAll(): Promise<Carro[]> {
    return this.carroRepository.find();
  }

  findOne(placa: string): Promise<Carro> {
    return this.carroRepository.findOne(placa);
  }

  async remove(placa: string): Promise<void> {
    await this.carroRepository.update(placa, { excluido: true });
  }

  async update(placa: string, alugado: boolean): Promise<void> {
    await this.carroRepository.update(placa, { alugado });
  }
}
