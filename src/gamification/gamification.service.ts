import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
    constructor(private prisma: PrismaService) { }

    async addPoints(userId: string, points: number, reason: string) {
        await this.prisma.userAction.create({
            data: {
                userId,
                points,
                type: reason,
            },
        });
        return { message: 'Points added', points };
    }

    async getStats(userId: string) {
        const actions = await this.prisma.userAction.findMany({ where: { userId } });
        const totalPoints = actions.reduce((acc, action) => acc + action.points, 0);

        const streak = await this.prisma.streak.findUnique({ where: { userId } });

        return {
            points: totalPoints,
            streak: streak?.currentStreak || 0,
            level: Math.floor(totalPoints / 100) + 1,
        };
    }
}
