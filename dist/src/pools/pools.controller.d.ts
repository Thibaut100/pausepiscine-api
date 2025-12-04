import { PoolsService } from './pools.service';
export declare class PoolsController {
    private readonly poolsService;
    constructor(poolsService: PoolsService);
    findAll(): import("./pools.service").Pool[];
    findOne(id: string): import("./pools.service").Pool | undefined;
    create(body: any): import("./pools.service").Pool;
    update(id: string, body: any): import("./pools.service").Pool;
    remove(id: string): {
        success: boolean;
    };
}
