import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_FIREBASE_ACCESSIBLE } from './decorators/firebase.decorator';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const isFirebaseAccessible = this.reflector.getAllAndOverride<boolean>(
            IS_FIREBASE_ACCESSIBLE,
            [context.getHandler(), context.getClass()],
        );
        if (isFirebaseAccessible) {
            const idToken = this.extractTokenFromHeader(request);
            if (idToken) {
                const data = await admin.auth().verifyIdToken(idToken);
                request.user = { userId: data.uid };
                return true;
            }
        }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
