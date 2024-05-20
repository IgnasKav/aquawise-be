import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';

@Module({
    exports: [ClientsService],
    controllers: [ClientsController],
    providers: [ClientsService],
})
export class ClientsModule {}
