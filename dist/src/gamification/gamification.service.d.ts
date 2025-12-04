import { PrismaService } from '../prisma/prisma.service';
export declare class GamificationService {
    private prisma;
    constructor(prisma: PrismaService);
    addPoints(userId: string, points: number, reason: string): Promise<{
        message: string;
        points: number;
    }>;
    getStats(userId: string): Promise<{
        points: number;
        streak: number;
        level: number;
    }>;
}
