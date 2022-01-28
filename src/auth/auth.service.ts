import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
   * Método com propósito de buscar um usuário (por meio do {@link usuarioService}) e posteriormente validá-lo.
   * 
   * @param username
   * @param password 
   * 
   * @returns Informações do usuário quando usuário e senha corretos
   * @returns null quando a usuário ou senha incorretos
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.usuarioService.findOne(username);

    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Método com o propósito de gerar o [JWT](https://jwt.io/) para o usuário.
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
