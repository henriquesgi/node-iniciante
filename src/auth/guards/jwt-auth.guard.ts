import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../constants';

/**
 * Guard com o propósito de evitar diversas utilizações da constante 'jwt'.
 *
 * Também permite que metainformações sejam adicionadas aos controladores de rota de modo a evitar
 * que o guard 'jwt' seja aplicado. Veja o método {@link canActivate}.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * @param reflector Utilizado para acessar metadados personalizados.
   */
  constructor(private reflector: Reflector) {
    super();
  }

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
