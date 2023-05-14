import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
    imports: [],
    exports: [ClientsService],
    controllers: [ClientsController],
    providers: [ClientsService],
})
export class ClientsModule {}
