import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsModule } from './advertisements/advertisementsModule';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import * as Joi from '@hapi/joi';

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
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // in production should be false
    }),
    AdvertisementsModule,
    AuthModule,
    UsersModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
