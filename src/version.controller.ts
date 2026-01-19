import { Controller, Get } from '@nestjs/common';

@Controller()
export class VersionController {
  @Get('version')
  version() {
    const commit =
      process.env.RENDER_GIT_COMMIT ||
      process.env.GIT_COMMIT ||
      process.env.COMMIT_SHA ||
      'unknown';

    const buildDate =
      process.env.BUILD_DATE ||
      process.env.RENDER_BUILD_TIME ||
      'unknown';

    return {
      ok: true,
      service: 'pausepiscine-api',
      env: process.env.NODE_ENV ?? 'unknown',
      appEnv: process.env.APP_ENV ?? 'unknown',
      commit,
      buildDate,
      timestamp: new Date().toISOString(),
    };
  }
}
