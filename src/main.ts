import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Autoriser les requêtes depuis ton front (on met large pour le moment)
  app.enableCors({
    origin: '*',
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Backend API running on port ${port}`);
}
bootstrap();

