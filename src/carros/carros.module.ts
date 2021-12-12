import { Module } from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CarrosController } from './carros.controller';

@Module({
  controllers: [CarrosController],
  providers: [CarrosService]
})
export class CarrosModule {}
