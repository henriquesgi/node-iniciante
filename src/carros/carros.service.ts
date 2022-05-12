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
  ) {}

  /**
   * Cria um registro na tabela {@link Carro}
   *
   * @param carro
   *
   * @returns Void quando o registro é criado.
   * @returns Um código em string quando algum erro acontecer durante o insert.
   */
  async create(carro: CreateCarroDto): Promise<void | string> {
    try {
      await this.carroRepository.insert({ ...carro });
    } catch (error) {
      return error.code;
    }
  }

  /**
   * Busca todos os registros na tabela {@link Carro}.
   *
   * A paginação garante que sejam retornados até 25 registros por página.
   *
   * @param pagina
   *
   * @returns Array contendo de 0 até 25 registros.
   */
  async findAll(pagina: number): Promise<Carro[] | []> {
    return await this.carroRepository.find({ take: 25, skip: pagina * 25 });
  }

  /**
   * Busca 1 registro na tabela {@link Carro}.
   *
   * @param placa Identificação do registro, PK.
   *
   * @returns Caso encontrado, 1 registro.
   */
  async findOne(placa: string): Promise<Carro | undefined> {
    return await this.carroRepository.findOne(placa);
  }

  /**
   * Remove, por exclusão lógica, 1 registro na tabela {@link Carro}.
   *
   * @param placa Identificação do registro, PK.
   *
   * @returns O número 1 caso algum registro for excluído logicamente.
   * @returns O número 0 caso nenhum registro for excluído logicamente.
   */
  async remove(placa: string): Promise<number> {
    const query = await this.carroRepository.update(
      { placa, excluido: false },
      { excluido: true },
    );
    return query.affected;
  }

  /**
   * Modifica 1 registro na tabela {@link Carro}.
   *
   * @param placa Identificação do registro, PK.
   * @param alugado Flag para modificar o registro.
   *
   * @returns O número 1 caso algum registro for modificado.
   * @returns O número 0 caso nenhum registro for modificado.
   */
  async update(placa: string, alugado: boolean): Promise<number> {
    const query = await this.carroRepository.update(placa, { alugado });
    return query.affected;
  }
}
