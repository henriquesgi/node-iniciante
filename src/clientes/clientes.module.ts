import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';

@Module({
  controllers: [ClientesController],
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClientesService]
})
export class ClientesModule { }
