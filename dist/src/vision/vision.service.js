"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisionService = void 0;
const common_1 = require("@nestjs/common");
let VisionService = class VisionService {
    analyses = [];
    nextId = 1;
    async analyzeWater(dto) {
        const { imageUrl, poolId } = dto;
        const ph = this.randomInRange(6.8, 8.2);
        const chlorine = this.randomInRange(0.2, 3.5);
        const { status, advice } = this.computeStatusAndAdvice(ph, chlorine);
        const recommendedProducts = this.getRecommendedProducts(ph, chlorine, status);
        const analysis = {
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
    getHistoryForPool(poolId) {
        return this.analyses
            .filter((a) => a.poolId === poolId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    randomInRange(min, max) {
        return Math.round((Math.random() * (max - min) + min) * 10) / 10;
    }
    computeStatusAndAdvice(ph, chlorine) {
        let status = 'OK';
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
    getRecommendedProducts(ph, chlorine, status) {
        const products = [];
        if (status === 'OK') {
            products.push({
                code: 'ENT-MAINT-01',
                name: 'Kit entretien hebdomadaire',
                description: 'Combinaison galets de chlore + produit anti-algues pour maintenir une eau stable.',
            });
        }
        if (ph < 7.0) {
            products.push({
                code: 'PH-PLUS-10KG',
                name: 'pH Plus granulés',
                description: 'À utiliser pour remonter progressivement le pH vers 7,2 – 7,4.',
            });
        }
        if (ph > 7.8) {
            products.push({
                code: 'PH-MINUS-10KG',
                name: 'pH Moins poudre',
                description: 'Permet de redescendre le pH et d’optimiser l’efficacité du chlore.',
            });
        }
        if (chlorine < 0.5) {
            products.push({
                code: 'CHLORE-CHOC-5KG',
                name: 'Chlore choc granulés',
                description: 'Traitement choc pour remonter rapidement le taux de chlore en cas de sous-dosage ou eau trouble.',
            }, {
                code: 'GALETS-LENTS-5KG',
                name: 'Galets de chlore à dissolution lente',
                description: 'Assure un maintien régulier du taux de chlore après le traitement choc.',
            });
        }
        if (chlorine > 3.0) {
            products.push({
                code: 'STOP-CHLORE',
                name: 'Réducteur de chlore',
                description: 'Permet de diminuer un taux de chlore trop élevé et d’améliorer le confort de baignade.',
            });
        }
        if (status === 'DANGER') {
            products.push({
                code: 'PACK-URGENCE',
                name: 'Pack urgence eau verte / trouble',
                description: 'Association choc : chlore choc + floculant + anti-algues pour rattraper une eau fortement déséquilibrée.',
            });
        }
        if (products.length === 0) {
            products.push({
                code: 'CONSEIL-PISCINISTE',
                name: 'Conseil personnalisé',
                description: 'Contactez votre pisciniste PausePiscine pour un ajustement précis en fonction de votre bassin.',
            });
        }
        return products;
    }
};
exports.VisionService = VisionService;
exports.VisionService = VisionService = __decorate([
    (0, common_1.Injectable)()
], VisionService);
//# sourceMappingURL=vision.service.js.map