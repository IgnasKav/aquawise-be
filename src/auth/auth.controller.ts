import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginRequestDto } from './dto/LoginRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
