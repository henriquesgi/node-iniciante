import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';

describe('HistoricoController', () => {
  let controller: HistoricoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricoController],
      providers: [HistoricoService],
    }).compile();

    controller = module.get<HistoricoController>(HistoricoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
