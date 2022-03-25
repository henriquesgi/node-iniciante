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

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(cnh: number): Promise<Cliente> {
    return this.clienteRepository.findOne(cnh);
  }
}
