import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { RegisterRequestDto } from './dto/registerRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.getUser(email);
    const passwordValid = await compare(password, user.password);

    if (!user || !passwordValid) {
      return null;
    }
    return user;
  }

  async login(user: UserEntity): Promise<any> {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(request: RegisterRequestDto) {
    return await this.usersService.saveUser(request);
  }
}
