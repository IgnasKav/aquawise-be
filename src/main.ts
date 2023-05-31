import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../firebase-service-key.json';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true }); // find out how to use specific cors url

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    const firebase_params = {
        type: serviceAccount.type,
        projectId: serviceAccount.project_id,
        privateKey: serviceAccount.private_key,
        client_email: serviceAccount.client_email,
        clientId: serviceAccount.client_id,
        authUri: serviceAccount.auth_uri,
        tokenUri: serviceAccount.token_uri,
        authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
        clientX509CertUrl: serviceAccount.client_x509_cert_url,
    };

    admin.initializeApp({
        credential: admin.credential.cert(firebase_params),
        databaseURL:
            'https://esp-firebase-demo-424e0-default-rtdb.europe-west1.firebasedatabase.app',
    });

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TimeoutInterceptor());
    await app.listen(process.env.BE_PORT);
}
bootstrap();
