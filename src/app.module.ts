import { VersionController } from './version.controller';
import { HealthController } from './health.controller';
import { ApiController } from './api.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolsModule } from './pools/pools.module';
import { VisionModule } from './vision/vision.module';

@Module({
  imports: [
    PoolsModule,
    VisionModule,
    // ❌ PAS de PrismaModule ici pour l’instant
  ],
  controllers: [AppController, HealthController, ApiController, VersionController],
  providers: [AppService],
})
export class AppModule {}

