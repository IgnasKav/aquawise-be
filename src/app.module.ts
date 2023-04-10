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

@Module({
  imports: [
    ConfigModule.forRoot({
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
      }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AdvertisementsModule,
    AuthModule,
    UsersModule,
    SearchModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
