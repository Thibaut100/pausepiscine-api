"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolsService = void 0;
const common_1 = require("@nestjs/common");
let PoolsService = class PoolsService {
    pools = [
        { id: '1', name: 'Piscine familiale', type: 'chlore' },
        { id: '2', name: 'Piscine municipale', type: 'sel' },
    ];
    findAll() {
        return this.pools;
    }
    findOne(id) {
        return this.pools.find((p) => p.id === id);
    }
    create(data) {
        const id = (this.pools.length + 1).toString();
        const pool = {
            id,
            name: data.name ?? `Piscine ${id}`,
            type: data.type ?? 'chlore',
            location: data.location,
        };
        this.pools.push(pool);
        return pool;
    }
    update(id, data) {
        const pool = this.findOne(id);
        if (!pool) {
            throw new Error(`Pool ${id} not found`);
        }
        if (data.name !== undefined)
            pool.name = data.name;
        if (data.type !== undefined)
            pool.type = data.type;
        if (data.location !== undefined)
            pool.location = data.location;
        return pool;
    }
    remove(id) {
        this.pools = this.pools.filter((p) => p.id !== id);
    }
};
exports.PoolsService = PoolsService;
exports.PoolsService = PoolsService = __decorate([
    (0, common_1.Injectable)()
], PoolsService);
//# sourceMappingURL=pools.service.js.map