import { CompanyEntity } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity])],
    exports: [CompaniesService],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
