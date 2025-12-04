// src/vision/vision.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VisionService } from './vision.service';
import { AnalyzeVisionDto } from './dto/analyze-vision.dto';

@Controller('vision')
export class VisionController {
  constructor(private readonly visionService: VisionService) {}

  @Post('analyze')
  analyze(@Body() dto: AnalyzeVisionDto) {
    // Renvoie directement le résultat complet (avec recommendedProducts)
    return this.visionService.analyzeWater(dto);
  }

  @Get('history/:poolId')
  getHistory(@Param('poolId') poolId: string) {
    // On renvoie aussi les produits recommandés pour chaque analyse
    return this.visionService.getHistoryForPool(poolId).map((a) => ({
      id: a.id,
      poolId: a.poolId,
      createdAt: a.createdAt.toISOString(),
      ph: a.ph,
      chlorine: a.chlorine,
      status: a.status,
      advice: a.advice,
      recommendedProducts: a.recommendedProducts ?? [],
    }));
  }
}

