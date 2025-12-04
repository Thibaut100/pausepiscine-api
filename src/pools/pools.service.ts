import { Injectable } from '@nestjs/common';

export type PoolType = 'chlore' | 'sel' | 'autre';

export interface Pool {
  id: string;
  name: string;
  type?: PoolType;
  location?: string;
}

@Injectable()
export class PoolsService {
  // 🧠 stockage en mémoire (pour la démo)
  private pools: Pool[] = [
    { id: '1', name: 'Piscine familiale', type: 'chlore' },
    { id: '2', name: 'Piscine municipale', type: 'sel' },
  ];

  findAll(): Pool[] {
    return this.pools;
  }

  findOne(id: string): Pool | undefined {
    return this.pools.find((p) => p.id === id);
  }

  create(data: Partial<Pool>): Pool {
    const id = (this.pools.length + 1).toString();
    const pool: Pool = {
      id,
      name: data.name ?? `Piscine ${id}`,
      type: (data.type as PoolType) ?? 'chlore',
      location: data.location,
    };

    this.pools.push(pool);
    return pool;
  }

  update(id: string, data: Partial<Pool>): Pool {
    const pool = this.findOne(id);
    if (!pool) {
      throw new Error(`Pool ${id} not found`);
    }

    if (data.name !== undefined) pool.name = data.name;
    if (data.type !== undefined) pool.type = data.type as PoolType;
    if (data.location !== undefined) pool.location = data.location;

    return pool;
  }

  remove(id: string): void {
    this.pools = this.pools.filter((p) => p.id !== id);
  }
}

