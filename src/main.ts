import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // body limits (safe)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use(cookieParser());

  const corsOriginsVar = process.env.CORS_ORIGINS;

  if (corsOriginsVar && corsOriginsVar.trim().length > 0) {
    const origins = corsOriginsVar.split(',').map(s => s.trim()).filter(Boolean);
    console.log(`[CORS] MODE=STRICT origins=${origins.join(', ')}`);

    app.enableCors({
      origin: origins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    console.log('[CORS] MODE=PERMISSIVE (no CORS_ORIGINS) credentials=false');

    // Reflect origin but do NOT allow credentials -> avoids Safari wildcard+credentials
    app.enableCors({
      origin: true,
      credentials: false,
    });
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT ? Number(process.env.PORT) : 10000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend API running on port ${port}`);
}

bootstrap();
