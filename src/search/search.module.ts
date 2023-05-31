import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { AdvertisementSearchService } from './advertisements/advertisement-search.service';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useFactory: async () => ({
                node: process.env.ELASTICSEARCH_NODE,
                auth: {
                    username: process.env.ELASTICSEARCH_USERNAME,
                    password: process.env.ELASTICSEARCH_PASSWORD,
                },
            }),
        }),
    ],
    exports: [ElasticsearchModule, AdvertisementSearchService],
    providers: [AdvertisementSearchService],
})
export class SearchModule {}
