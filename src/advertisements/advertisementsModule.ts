import { Module } from '@nestjs/common';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementEntity } from './entities/advertisement.entity';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [TypeOrmModule.forFeature([AdvertisementEntity]), SearchModule],
    controllers: [AdvertisementsController],
    providers: [AdvertisementsService],
})
export class AdvertisementsModule {}
