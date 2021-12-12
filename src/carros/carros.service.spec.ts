import { Test, TestingModule } from '@nestjs/testing';
import { CarrosService } from './carros.service';

describe('CarrosService', () => {
  let service: CarrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrosService],
    }).compile();

    service = module.get<CarrosService>(CarrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
