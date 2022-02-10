import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';
import { Historico } from './entities/historico.entity';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(Historico)
    private historicoRepository: Repository<Historico>,
  ) { }

  async create(historico: CreateHistoricoDto): Promise<void> {
    await this.historicoRepository.insert(historico);
  }

  findAll(): Promise<Historico[]> {
    return this.historicoRepository.find();
  }

  async update(placa: string, historico: UpdateHistoricoDto): Promise<void> {
    await this.historicoRepository.update(
      { placa, dataDevolucaoEfetuada: null },
      historico
    );
  }
}
