import {
    Body,
    Controller,
    Get,
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
import { UserRegistrationRequestDto } from './dto/RegistrationRequest.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get('current')
    getProfile(@Request() req): Promise<UserDto> {
        return this.authService.findUserByEmail(req.user.username);
    }

    @Post('login')
    login(@Body() request: LoginRequestDto) {
        return this.authService.login(request);
    }

    @Post('invite')
    async invite(@Body() request: InvitationRequestDto) {
        await this.authService.invite(request);
    }

    @Get('register')
    getByRegistrationId(@Query('registrationId') registrationId: string) {
        return this.authService.findUserByRegistrationId(registrationId);
    }

    @Post('register')
    async register(@Body() request: UserRegistrationRequestDto) {
        await this.authService.register(request);
    }
}
