
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

/**
 * Definições para a estratégia 'passport-local'.
 * 
 * Ao utilizar qualquer estratégia do [Passport.js](https://www.passportjs.org/)
 * de modo 'Vanilla JS' são necessárias basicamente duas instruções:
 * 
 * 1 - Um conjunto de opções para a estratégia;
 * 
 * 2 - Um callback para verificação.
 * 
 * Com NestJS o primeiro item é configurado extendendo a estratégia desejada
 * e fornecendo as devidas configurações em 'super', já o segundo item,
 * o callback de verificação, deve ser implementado com o método {@link validate}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Método responsável por dizer ao Passport como lidar com o repositório de usuários.
   * 
   * Por exemplo: verificar se o usuário existe ou verificar se ele tem credenciais válidas.
   * 
   * O Passport espera que seja o usuário com suas informações necessárias quando a
   * validação for bem-sucedida.
   * 
   * Caso a validação falhe, o esperado é que seja retornado null ou que o devido tratamento
   * seja realizado.
   * 
   * @param username 
   * @param password 
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('usuario incorreto ou senha incorreta');
    }
    return user;
  }
}