import { Module } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { HistoricoController } from './historico.controller';

@Module({
  controllers: [HistoricoController],
  providers: [HistoricoService]
})
export class HistoricoModule {}
