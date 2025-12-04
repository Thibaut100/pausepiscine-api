export type PoolType = 'chlore' | 'sel' | 'autre';
export interface Pool {
    id: string;
    name: string;
    type?: PoolType;
    location?: string;
}
export declare class PoolsService {
    private pools;
    findAll(): Pool[];
    findOne(id: string): Pool | undefined;
    create(data: Partial<Pool>): Pool;
    update(id: string, data: Partial<Pool>): Pool;
    remove(id: string): void;
}
