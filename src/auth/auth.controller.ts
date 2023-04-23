import {
  Body,
  Controller,
  Request,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request) {
    return this.authService.login(request.user);
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
