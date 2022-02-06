
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * Definições para a estratégia 'passport-jwt'.
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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'minha-chave',
    });
  }

  /**
   * Diz ao Passport como lidar com o repositório de usuários.
   * 
   * Por exemplo: verificar se o usuário existe ou verificar se ele tem credenciais válidas.
   * 
   * O Passport espera que seja retornado o usuário com suas informações necessárias quando a
   * validação for bem-sucedida. O Passport irá adicionar essas informações automaticamente no
   * objeto Request.
   * 
   * Caso a validação falhe, o esperado é que seja retornado null ou que o devido tratamento
   * seja realizado.
   * 
   * @param payload 
   */
  async validate(payload: any) {
    return { username: payload.username };
  }
}