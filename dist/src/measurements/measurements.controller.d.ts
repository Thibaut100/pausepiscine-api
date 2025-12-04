import { MeasurementsService } from './measurements.service';
export declare class MeasurementsController {
    private readonly measurementsService;
    constructor(measurementsService: MeasurementsService);
    create(req: any, createMeasurementDto: any): Promise<{
        id: string;
        poolId: string;
        advice: string | null;
        createdAt: Date;
        userId: string;
        ph: number;
        tac: number;
        chlorine: number;
        stabilizer: number;
        photoUrl: string | null;
    }>;
    findAll(req: any, poolId?: string): Promise<{
        id: string;
        poolId: string;
        advice: string | null;
        createdAt: Date;
        userId: string;
        ph: number;
        tac: number;
        chlorine: number;
        stabilizer: number;
        photoUrl: string | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        poolId: string;
        advice: string | null;
        createdAt: Date;
        userId: string;
        ph: number;
        tac: number;
        chlorine: number;
        stabilizer: number;
        photoUrl: string | null;
    } | null>;
}
