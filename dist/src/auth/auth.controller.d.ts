import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: LoginDto): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
    register(body: RegisterDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        stripeCustomerId: string | null;
    }>;
    getProfile(req: any): any;
}
