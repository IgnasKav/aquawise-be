import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthGuard } from './auth.guard';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const idToken = request.headers['idToken'];
        if (idToken) {
            const data = await admin.auth().verifyIdToken(idToken);
            request.user = { userId: data.ui };
            return true;
        }
        return super.canActivate(context);
    }
}
