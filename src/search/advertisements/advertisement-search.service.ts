import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { AdvertisementEntity } from '../../advertisements/entities/advertisement.entity';

@Injectable()
export class AdvertisementSearchService {
    documentIndex = 'advertisements';

    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async create(advertisement: AdvertisementEntity) {
        return this.elasticsearchService.index({
            index: this.documentIndex,
            body: {
                id: advertisement.id,
                title: advertisement.title,
                date: advertisement.date,
                description: advertisement.description,
                state: advertisement.state,
                city: advertisement.city,
                views: advertisement.views,
                price: advertisement.price,
                categoryId: advertisement.categoryId,
                ownerId: advertisement.ownerId,
            },
        });
    }

    async search(text: string) {
        const result = await this.elasticsearchService.search({
            index: this.documentIndex,
            body: {
                query: {
                    multi_match: {
                        query: text,
                        fields: ['title', 'description'],
                    },
                },
            },
        });

        return result;
    }
}
