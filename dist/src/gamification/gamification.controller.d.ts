import { GamificationService } from './gamification.service';
export declare class GamificationController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    getStats(req: any): Promise<{
        points: number;
        streak: number;
        level: number;
    }>;
}
