import { AnalyzeVisionDto } from './dto/analyze-vision.dto';
export type WaterStatus = 'OK' | 'WARNING' | 'DANGER';
export interface RecommendedProduct {
    code: string;
    name: string;
    description: string;
}
export interface WaterAnalysis {
    id: number;
    poolId: string;
    createdAt: Date;
    ph: number;
    chlorine: number;
    status: WaterStatus;
    advice: string;
    recommendedProducts: RecommendedProduct[];
}
export declare class VisionService {
    private analyses;
    private nextId;
    analyzeWater(dto: AnalyzeVisionDto): Promise<{
        id: number;
        poolId: string;
        createdAt: string;
        ph: number;
        chlorine: number;
        status: WaterStatus;
        advice: string;
        recommendedProducts: RecommendedProduct[];
        imageUrl: string;
    }>;
    getHistoryForPool(poolId: string): WaterAnalysis[];
    private randomInRange;
    private computeStatusAndAdvice;
    private getRecommendedProducts;
}
