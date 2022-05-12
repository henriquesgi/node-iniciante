import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Historico } from './entities/historico.entity';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';

@Module({
  controllers: [HistoricoController],
  imports: [TypeOrmModule.forFeature([Historico])],
  providers: [HistoricoService],
})
export class HistoricoModule {}
