import { Test, TestingModule } from '@nestjs/testing';
import { CarrosController } from './carros.controller';
import { CarrosService } from './carros.service';

describe('CarrosController', () => {
  let controller: CarrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrosController],
      providers: [CarrosService],
    }).compile();

    controller = module.get<CarrosController>(CarrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
