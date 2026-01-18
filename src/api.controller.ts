import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('api/ping')
  ping() {
    return {
      ok: true,
      service: 'pausepiscine-api',
      env: process.env.NODE_ENV ?? 'unknown',
      appEnv: process.env.APP_ENV ?? 'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}
