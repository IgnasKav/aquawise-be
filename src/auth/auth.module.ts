import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60d' },
            }),
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
