import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarrosController } from './carros.controller';
import { CarrosService } from './carros.service';
import { Carro } from './entities/carro.entity';

@Module({
  controllers: [CarrosController],
  imports: [TypeOrmModule.forFeature([Carro])],
  providers: [CarrosService],
})
export class CarrosModule {}
