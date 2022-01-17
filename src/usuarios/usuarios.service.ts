import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }
}
