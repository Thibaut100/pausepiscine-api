import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // (optionnel) CORS pour autoriser ton frontend plus tard
  app.enableCors({
    origin: '*', // plus tard on mettra ton vrai domaine
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();

