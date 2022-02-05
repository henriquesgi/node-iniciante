
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard com o propósito de evitar diversas utilizações da constante 'local'.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }
