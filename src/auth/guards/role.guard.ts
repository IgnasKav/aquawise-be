import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        let roles = this.reflector.get<string[] | string>(
            'roles',
            context.getHandler(),
        );

        if (!roles) {
            return true;
        }

        if (typeof roles === 'string') {
            roles = [roles];
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user as UserEntity;
        const isValid = roles.includes(user.role);

        if (!isValid) {
            throw new HttpException(
                {
                    message: `User cannot access this data, because it doesn't have the right role.`,
                },
                HttpStatus.FORBIDDEN,
            );
        }

        return isValid;
    }
}
