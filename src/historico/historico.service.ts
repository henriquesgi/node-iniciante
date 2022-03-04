import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHistoricoDto } from './dto/create-historico.dto';
import { Historico } from './entities/historico.entity';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(Historico)
    private historicoRepository: Repository<Historico>,
  ) { }

  async create(historico: CreateHistoricoDto): Promise<void> {
    await this.historicoRepository.insert({
      ...historico,
      dataDevolucaoPrevista: new Date(historico.dataDevolucaoPrevista),
      dataLocacao: new Date()
    });
  }

  findAll(): Promise<Historico[]> {
    return this.historicoRepository.find();
  }

  async update(id: number): Promise<void> {
    await this.historicoRepository.update(
      id,
      { dataDevolucaoEfetuada: new Date() }
    )
  }
}
