import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CarrosModule } from './carros/carros.module';
import { ClientesModule } from './clientes/clientes.module';
import { HistoricoModule } from './historico/historico.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    AuthModule,
    CarrosModule,
    ClientesModule,
    HistoricoModule,
    UsuariosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      migrations: ['migrations/*js'],
      cli: {
        migrationsDir: './src/db/migration',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
