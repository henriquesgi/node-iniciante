import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../usuarios/usuarios.service';

/**
 * Serviço utilizado para aplicar e possibilitar diferentes formas de autenticação.
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuariosService,
  ) { }

  /**
   * Procura por um usuário (responsabilidade delagada ao {@link usuarioService}) e caso o usuário
   * exista é feita uma comparação ([bcrypt](https://github.com/kelektiv/node.bcrypt.js)) entre o senha
   * fornecida e o hash do usuário.
   * 
   * @param username
   * @param password 
   * 
   * @returns Informações do usuário quando usuário e senha corretos
   * @returns null quando usuário ou senha incorretos
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.usuarioService.findOne(username);

    if (user?.password) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  /**
   * Gera o [JWT](https://jwt.io/) para o usuário.
   * 
   * @param user 
   * @returns Access Token
   */
  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
