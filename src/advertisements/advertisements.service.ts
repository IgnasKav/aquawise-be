import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRequestDto } from './dto/searchRequest.dto';
import { AddToWatchLaterRequestDto } from './dto/addToWatchLaterRequest.dto';
import { AdvertisementEntity } from './entities/advertisement.entity';
import { Repository } from 'typeorm';
import { AdvertisementCreateRequestDto } from './dto/advertisementCreateRequest.dto';
import { AdvertisementUpdateRequestDto } from './dto/advertisementUpdateRequest.dto';
import { AdvertisementSearchService } from '../search/advertisements/advertisement-search.service';

@Injectable()
export class AdvertisementsService {
    constructor(
        @InjectRepository(AdvertisementEntity)
        private readonly advertisementsRepository: Repository<AdvertisementEntity>,
        private readonly advertisementSearchService: AdvertisementSearchService,
    ) {}

    searchAdvertisements(request: SearchRequestDto) {
        return this.advertisementSearchService.search(request.query);
    }

    async getAdvertisementById(id: string) {
        const advertisement = await this.advertisementsRepository.findOne({
            where: { id: id },
        });

        if (!advertisement) {
            throw new NotFoundException(
                `Advertisement with id: ${id} not found`,
            );
        }

        return advertisement;
    }

    async createAdvertisement(request: AdvertisementCreateRequestDto) {
        const advertisement = this.advertisementsRepository.create({
            ...request,
            views: 0,
            ownerId: '73aef2dd-c227-4774-b547-b3117b543863',
            date: new Date().toISOString(),
        });
        await this.advertisementsRepository.save(advertisement);
        await this.advertisementSearchService.create(advertisement);
        return advertisement;
    }

    async updateAdvertisement(
        id: string,
        request: AdvertisementUpdateRequestDto,
    ) {
        const advertisement = await this.advertisementsRepository.preload({
            id: id,
            ...request,
        });

        if (!advertisement) {
            throw new NotFoundException(
                `Advertisement with id: ${id} not found`,
            );
        }
        return this.advertisementsRepository.save(advertisement);
    }

    async deleteAdvertisement(id: string) {
        const advertisement = await this.getAdvertisementById(id);

        return this.advertisementsRepository.delete(advertisement);
    }

    addToWatchLater(id: string) {
        return id;
    }

    searchWatchLater(request: AddToWatchLaterRequestDto) {
        return request;
    }

    updateImage(image: any) {
        return image;
    }

    // for testing
    async getAll() {
        return await this.advertisementsRepository.find();
    }
}
