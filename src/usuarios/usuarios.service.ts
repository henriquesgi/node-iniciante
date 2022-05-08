import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  /**
   * Busca 1 registro na tabela {@link Usuario}.
   * 
   * @param id Identificação do registro, PK.
   * 
   * @returns Caso encontrado, 1 registro.
   */
  async findOne(id: string) {
    return await this.usuarioRepository.findOne(id);
  }
}
