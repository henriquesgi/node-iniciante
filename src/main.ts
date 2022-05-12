import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      description: 'Insira o **JWT** para utilizar as APIs.',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setDescription('Documentação das APIs do projeto')
    .setTitle('node-iniciante')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('development/api', app, document);
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
