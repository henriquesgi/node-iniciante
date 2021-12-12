import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoService } from './historico.service';

describe('HistoricoService', () => {
  let service: HistoricoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricoService],
    }).compile();

    service = module.get<HistoricoService>(HistoricoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
