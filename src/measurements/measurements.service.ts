import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Measurement } from '@prisma/client';

@Injectable()
export class MeasurementsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: any): Promise<Measurement> {
        return this.prisma.measurement.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async findAll(userId: string, poolId?: string): Promise<Measurement[]> {
        const where: any = { userId };
        if (poolId) {
            where.poolId = poolId;
        }
        return this.prisma.measurement.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string, userId: string): Promise<Measurement | null> {
        return this.prisma.measurement.findFirst({ where: { id, userId } });
    }
}
