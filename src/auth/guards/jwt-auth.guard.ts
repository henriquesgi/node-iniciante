
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../constants';

/**
 * Guard (classe) com o propósito de evitar
 * diversas utilizações da constante 'jwt'.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * @param reflector Utilizado para acessar metadados personalizados.
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * @ignore
   */
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}