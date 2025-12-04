import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('gamification')
@UseGuards(AuthGuard('jwt'))
export class GamificationController {
    constructor(private readonly gamificationService: GamificationService) { }

    @Get('stats')
    getStats(@Request() req: any) {
        return this.gamificationService.getStats(req.user.userId);
    }
}
