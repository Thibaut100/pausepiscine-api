import { PrismaService } from '../prisma/prisma.service';
import { Measurement } from '@prisma/client';
export declare class MeasurementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<Measurement>;
    findAll(userId: string, poolId?: string): Promise<Measurement[]>;
    findOne(id: string, userId: string): Promise<Measurement | null>;
}
