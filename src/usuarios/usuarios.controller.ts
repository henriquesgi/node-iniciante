import { Controller, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get(':id')
  // dto?
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }
}
