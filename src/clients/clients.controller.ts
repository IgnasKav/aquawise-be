import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientCreateDto } from './dto/clientCreate.dto';

@Controller('')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
    @Get()
    getClients(@Param('companyId') companyId: string) {
        return this.clientsService.getClientsNew(companyId);
    }

    @Post()
    createClient(
        @Param('companyId') companyId: string,
        @Body() request: ClientCreateDto,
    ) {
        return this.clientsService.createClient(request, companyId);
    }
}
