import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  exports: [UsuariosService],
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
})
export class UsuariosModule {}
