import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import * as admin from 'firebase-admin';

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
        type: process.env.TYPE,
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        clientId: process.env.CLIENT_ID,
        authUri: process.env.AUTH_URI,
        tokenUri: process.env.TOKEN_URI,
        authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
        clientX509CertUrl: process.env.CLIENT_X509_CERT_URL,
    };

    admin.initializeApp({
        credential: admin.credential.cert(firebase_params),
        databaseURL:
            'https://esp-firebase-demo-424e0-default-rtdb.europe-west1.firebasedatabase.app',
    });

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TimeoutInterceptor());
    await app.listen(process.env.PORT);
}
bootstrap();
