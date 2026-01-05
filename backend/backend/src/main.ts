import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.enableCors({
    origin: [
      'http://localhost:3000',      // Puerto estándar de React/Next.js
      'http://localhost:3001',      // El puerto que tenías configurado
      'https://uniformar.ar',
      'https://www.uniformar.ar'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000); 
}
bootstrap();