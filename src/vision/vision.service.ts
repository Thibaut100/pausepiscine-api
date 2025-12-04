// src/vision/vision.service.ts
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class VisionService {
  // 🧠 stockage en mémoire
  private analyses: WaterAnalysis[] = [];
  private nextId = 1;

  async analyzeWater(dto: AnalyzeVisionDto) {
    const { imageUrl, poolId } = dto;

    // Pour l’instant : FAKE ANALYSE, on simule des valeurs
    const ph = this.randomInRange(6.8, 8.2);
    const chlorine = this.randomInRange(0.2, 3.5);

    const { status, advice } = this.computeStatusAndAdvice(ph, chlorine);
    const recommendedProducts = this.getRecommendedProducts(ph, chlorine, status);

    const analysis: WaterAnalysis = {
      id: this.nextId++,
      poolId,
      createdAt: new Date(),
      ph,
      chlorine,
      status,
      advice,
      recommendedProducts,
    };

    this.analyses.push(analysis);

    // Ce qu’on renvoie au front
    return {
      id: analysis.id,
      poolId: analysis.poolId,
      createdAt: analysis.createdAt.toISOString(),
      ph: analysis.ph,
      chlorine: analysis.chlorine,
      status: analysis.status,
      advice: analysis.advice,
      recommendedProducts: analysis.recommendedProducts,
      imageUrl,
    };
  }

  getHistoryForPool(poolId: string): WaterAnalysis[] {
    return this.analyses
      .filter((a) => a.poolId === poolId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // --- Helpers ---

  private randomInRange(min: number, max: number) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
  }

  private computeStatusAndAdvice(
    ph: number,
    chlorine: number,
  ): { status: WaterStatus; advice: string } {
    let status: WaterStatus = 'OK';
    let advice = 'Tout est bon 👍';

    if (ph < 7.0 || ph > 7.8 || chlorine < 0.5 || chlorine > 2.5) {
      status = 'WARNING';
      advice = 'Paramètres à surveiller. Ajuster légèrement le traitement.';
    }

    if (ph < 6.8 || ph > 8.2 || chlorine < 0.2 || chlorine > 3.5) {
      status = 'DANGER';
      advice = 'Corriger rapidement et contacter le pisciniste.';
    }

    return { status, advice };
  }

  private getRecommendedProducts(
    ph: number,
    chlorine: number,
    status: WaterStatus,
  ): RecommendedProduct[] {
    const products: RecommendedProduct[] = [];

    // Produits de base d’entretien, si tout est OK
    if (status === 'OK') {
      products.push({
        code: 'ENT-MAINT-01',
        name: 'Kit entretien hebdomadaire',
        description:
          'Combinaison galets de chlore + produit anti-algues pour maintenir une eau stable.',
      });
    }

    // pH trop bas
    if (ph < 7.0) {
      products.push({
        code: 'PH-PLUS-10KG',
        name: 'pH Plus granulés',
        description:
          'À utiliser pour remonter progressivement le pH vers 7,2 – 7,4.',
      });
    }

    // pH trop haut
    if (ph > 7.8) {
      products.push({
        code: 'PH-MINUS-10KG',
        name: 'pH Moins poudre',
        description:
          'Permet de redescendre le pH et d’optimiser l’efficacité du chlore.',
      });
    }

    // Chlore trop bas
    if (chlorine < 0.5) {
      products.push(
        {
          code: 'CHLORE-CHOC-5KG',
          name: 'Chlore choc granulés',
          description:
            'Traitement choc pour remonter rapidement le taux de chlore en cas de sous-dosage ou eau trouble.',
        },
        {
          code: 'GALETS-LENTS-5KG',
          name: 'Galets de chlore à dissolution lente',
          description:
            'Assure un maintien régulier du taux de chlore après le traitement choc.',
        },
      );
    }

    // Chlore trop haut
    if (chlorine > 3.0) {
      products.push({
        code: 'STOP-CHLORE',
        name: 'Réducteur de chlore',
        description:
          'Permet de diminuer un taux de chlore trop élevé et d’améliorer le confort de baignade.',
      });
    }

    // Cas danger : proposer un “pack secours”
    if (status === 'DANGER') {
      products.push({
        code: 'PACK-URGENCE',
        name: 'Pack urgence eau verte / trouble',
        description:
          'Association choc : chlore choc + floculant + anti-algues pour rattraper une eau fortement déséquilibrée.',
      });
    }

    // Si rien de spécifique n’a été proposé (peu probable), on assure un produit générique
    if (products.length === 0) {
      products.push({
        code: 'CONSEIL-PISCINISTE',
        name: 'Conseil personnalisé',
        description:
          'Contactez votre pisciniste PausePiscine pour un ajustement précis en fonction de votre bassin.',
      });
    }

    return products;
  }
}

