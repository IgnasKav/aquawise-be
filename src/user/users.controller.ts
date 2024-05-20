import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserFilterSaveRequest } from './dto/user-filter-save-request';
import { UserFilterScope } from './entities/user-filter.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId/:scope/filters')
    async getUserFilters(
        @Param('userId') userId: string,
        @Param('scope') scope: UserFilterScope,
    ) {
        return await this.usersService.getUserFilters(userId);
    }

    @Post(':userId/filters')
    async saveUserFilters(
        @Param('userId') userId: string,
        @Body() req: UserFilterSaveRequest,
    ) {
        return await this.usersService.saveUserFilters(userId, req);
    }
}
