import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginRequestDto } from './dto/LoginRequest.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() request: LoginRequestDto) {
        return this.authService.login(request);
    }

    @Post('register')
    async register(@Body() request: RegisterRequestDto) {
        await this.authService.register(request);
    }

    @Get('confirm/:registrationId')
    async confirmRegistration(@Param('registrationId') registrationId: string) {
        await this.authService.confirmRegistration(registrationId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
