import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) { }

  /**
   * Cria um registro na tabela {@link Cliente}
   * 
   * @param cliente
   * 
   * @returns Void quando o registro é criado.
   * @returns Um código em string quando algum erro acontecer durante o insert.
   */
  async create(cliente: CreateClienteDto): Promise<void | string> {
    try {
      await this.clienteRepository.insert(cliente);
    } catch (error) {
      return error.code
    }
  }

  /**
   * Busca todos os registros na tabela {@link Cliente}.
   * 
   * A paginação garante que sejam retornados até 25 registros por página.
   * 
   * @param pagina
   * 
   * @returns Array contendo de 0 até 25 registros.
   */
  findAll(pagina: number = 0): Promise<Cliente[]> {
    return this.clienteRepository.find({ take: 25, skip: pagina * 25 });
  }

  /**
   * Busca 1 registro na tabela {@link Cliente}.
   * 
   * @param cnh Identificação do registro, PK.
   * 
   * @returns Caso encontrado, 1 registro.
   */
  findOne(cnh: number): Promise<Cliente> {
    return this.clienteRepository.findOne(cnh);
  }
}
