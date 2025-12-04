import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        stripeCustomerId: string | null;
    } | null>;
    updateProfile(req: any, body: any): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        stripeCustomerId: string | null;
    }>;
}
