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

  async create(carro: CreateCarroDto): Promise<void | string> {
    try {
      await this.carroRepository.insert({ ...carro });
    } catch (error) {
      return error.code
    }
  }

  findAll(pagina: number = 0): Promise<Carro[]> {
    return this.carroRepository.find({ take: 25, skip: pagina * 25 });
  }

  findOne(placa: string): Promise<Carro> {
    return this.carroRepository.findOne(placa);
  }

  async remove(placa: string): Promise<number> {
    const query = await this.carroRepository.update(
      { placa, excluido: false },
      { excluido: true }
    );
    return query.affected
  }

  async update(placa: string, alugado: boolean): Promise<number> {
    const query = await this.carroRepository.update(placa, { alugado });
    return query.affected
  }
}
