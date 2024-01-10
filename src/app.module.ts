import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { createDataSourceOptions } from '../database/data-source';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { ClientsModule } from './clients/clients.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrdersModule } from './orders/orders.module';
import { RouterModule } from '@nestjs/core';
import { ImagesModule } from './images/images.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(createDataSourceOptions()),
        ServeStaticModule.forRoot({
            rootPath: `./images`,
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
        CompaniesModule,
        OrdersModule,
        ClientsModule,
        MailModule,
        ImagesModule,
        RouterModule.register([
            {
                path: 'companies',
                module: CompaniesModule,
                children: [
                    {
                        path: ':companyId/clients',
                        module: ClientsModule,
                        children: [
                            {
                                path: ':clientId/orders',
                                module: OrdersModule,
                            },
                        ],
                    },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
