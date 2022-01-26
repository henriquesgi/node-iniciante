
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'minha-chave',
    });
  }

  async validate(payload: any) {
    // Informações que serão retornadas sobre o usuário
    // Aqui também poderia ser feito uma validação (com auxílio de um BD) para checar o token
    return { username: payload.username };
  }
}