import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

/**
 * Módulo responsável pela autenticação de usuários.
 *
 * Todo o processo é feito utilizando o [Passport.js](https://www.passportjs.org/).
 */
@Module({
  exports: [AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    PassportModule,
    UsuariosModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
