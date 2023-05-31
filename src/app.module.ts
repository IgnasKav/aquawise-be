import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsModule } from './advertisements/advertisementsModule';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { MailModule } from './mail/mail.module';
import * as Joi from '@hapi/joi';
import { dataSourceOptions } from '../database/data-source';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { ClientsModule } from './clients/clients.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrdersModule } from './orders/orders.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.required(),
                DATABASE_PORT: Joi.number().required(),
                DATABASE_USERNAME: Joi.required(),
                DATABASE_PASSWORD: Joi.required(),
                DATABASE_NAME: Joi.required(),
                ELASTICSEARCH_PASSWORD: Joi.required(),
                ELASTICSEARCH_USERNAME: Joi.required(),
                ELASTICSEARCH_NODE: Joi.required(),
                JWT_SECRET: Joi.required(),
                MAIL_HOST: Joi.required(),
                MAIL_USER: Joi.required(),
                MAIL_PORT: Joi.number().required(),
                BE_PORT: Joi.required(),
                BE_URL: Joi.required(),
            }),
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        ServeStaticModule.forRoot({
            rootPath: `./images`,
        }),
        AdvertisementsModule,
        AuthModule,
        UsersModule,
        SearchModule,
        ProductsModule,
        CompaniesModule,
        OrdersModule,
        ClientsModule,
        MailModule,
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
