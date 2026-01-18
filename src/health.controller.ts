import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  health() {
    return {
      ok: true,
      service: 'pausepiscine-api',
      env: process.env.NODE_ENV ?? 'unknown',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
