import { Controller, Get, UseGuards, Request, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getProfile(@Request() req: any) {
        const user = await this.usersService.findById(req.user.userId);
        if (!user) {
            return null;
        }
        const { password, ...result } = user;
        return result;
    }

    @Patch('me')
    async updateProfile(@Request() req: any, @Body() body: any) {
        const user = await this.usersService.update(req.user.userId, body);
        const { password, ...result } = user;
        return result;
    }
}
