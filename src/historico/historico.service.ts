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

  async create(historico: CreateHistoricoDto): Promise<void | string> {
    try {
      await this.historicoRepository.insert({
        ...historico,
        dataDevolucaoPrevista: new Date(historico.dataDevolucaoPrevista),
        dataLocacao: new Date()
      });
    } catch (error) {
      return error.code
    }
  }

  findAll(pagina: number = 0): Promise<Historico[]> {
    return this.historicoRepository.find({ take: 25, skip: pagina * 25 });
  }

  async update(id: number): Promise<number> {
    const query = await this.historicoRepository.update(
      id,
      { dataDevolucaoEfetuada: new Date() }
    )
    return query.affected
  }
}
