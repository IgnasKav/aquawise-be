import { CompanyEntity } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyEntity]),
        ClientsModule,
        OrdersModule,
    ],
    exports: [CompaniesService],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
