import { VisionService } from './vision.service';
import { AnalyzeVisionDto } from './dto/analyze-vision.dto';
export declare class VisionController {
    private readonly visionService;
    constructor(visionService: VisionService);
    analyze(dto: AnalyzeVisionDto): Promise<{
        id: number;
        poolId: string;
        createdAt: string;
        ph: number;
        chlorine: number;
        status: import("./vision.service").WaterStatus;
        advice: string;
        recommendedProducts: import("./vision.service").RecommendedProduct[];
        imageUrl: string;
    }>;
    getHistory(poolId: string): {
        id: number;
        poolId: string;
        createdAt: string;
        ph: number;
        chlorine: number;
        status: import("./vision.service").WaterStatus;
        advice: string;
        recommendedProducts: import("./vision.service").RecommendedProduct[];
    }[];
}
