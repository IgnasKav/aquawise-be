import { CompanyEntity } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { CompanyClientRelationEntity } from './entities/company-client-relation.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CompanyEntity,
            UserEntity,
            CompanyClientRelationEntity,
            ClientEntity,
        ]),
    ],
    exports: [CompaniesService],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
