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

  async create(cliente: CreateClienteDto): Promise<void | string> {
    try {
      await this.clienteRepository.insert(cliente);
    } catch (error) {
      return error.code
    }
  }

  findAll(pagina: number = 0): Promise<Cliente[]> {
    return this.clienteRepository.find({ take: 25, skip: pagina * 25 });
  }

  findOne(cnh: number): Promise<Cliente> {
    return this.clienteRepository.findOne(cnh);
  }
}
