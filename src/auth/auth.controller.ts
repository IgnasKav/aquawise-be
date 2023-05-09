import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InvitationRequestDto } from './dto/InvitationRequest.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginRequestDto } from './dto/LoginRequest.dto';
import { UserDto } from '../user/dto/user.dto';
import { UsersService } from '../user/users.service';
import { RegistrationRequestDto } from './dto/RegistrationRequest.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() request: LoginRequestDto) {
        return this.authService.login(request);
    }

    @Post('invite')
    async invite(@Body() request: InvitationRequestDto) {
        await this.authService.invite(request);
    }

    @Post('register')
    async register(@Query() query, @Body() request: RegistrationRequestDto) {
        if (query.userRegistrationId) {
            return await this.authService.register(
                request,
                query.userRegistrationId,
            );
        }
        if (query.companyRegistrationId) {
            return await this.authService.registerAdmin(
                request,
                query.companyRegistrationId,
            );
        }
        return NotFoundException;
    }

    @Get('')
    async getByRegistrationId(@Query() query) {
        return this.usersService.findByRegistrationId(query.userRegistrationId);
    }

    // @Get('confirm/:registrationId')
    // async confirmRegistration(@Param('registrationId') registrationId: string) {
    //     await this.authService.confirmRegistration(registrationId);
    // }

    @UseGuards(JwtAuthGuard)
    @Get('current')
    getProfile(@Request() req): Promise<UserDto> {
        return this.usersService.findByEmail(req.user.username);
    }
}
