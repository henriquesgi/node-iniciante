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

  /**
   * Cria um registro na tabela {@link Historico}
   * 
   * @param historico
   * 
   * @returns Void quando o registro é criado.
   * @returns Um código em string quando algum erro acontecer durante o insert.
   */
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

  /**
   * Busca todos os registros na tabela {@link Historico}.
   * 
   * A paginação garante que sejam retornados até 25 registros por página.
   * 
   * @param pagina
   * 
   * @returns Array contendo de 0 até 25 registros.
   */
  async findAll(pagina: number = 0): Promise<Historico[] | []> {
    return await this.historicoRepository.find({ take: 25, skip: pagina * 25 });
  }

  /**
   * Modifica 1 registro na tabela {@link Historico}.
   * 
   * @param id Identificação do registro, PK.
   * 
   * @returns O número 1 caso algum registro for modificado.
   * @returns O número 0 caso nenhum registro for modificado.
   */
  async update(id: number): Promise<number> {
    const query = await this.historicoRepository.update(
      id,
      { dataDevolucaoEfetuada: new Date() }
    )
    return query.affected
  }
}
