import { Injectable } from '@nestjs/common';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';

@Injectable()
export class HistoricoService {
  create(createHistoricoDto: CreateHistoricoDto) {
    return 'This action adds a new historico';
  }

  findAll() {
    return `This action returns all historico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historico`;
  }

  update(id: number, updateHistoricoDto: UpdateHistoricoDto) {
    return `This action updates a #${id} historico`;
  }

  remove(id: number) {
    return `This action removes a #${id} historico`;
  }
}
