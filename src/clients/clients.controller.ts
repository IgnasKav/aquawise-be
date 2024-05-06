import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { SearchClientsByCompanyRequest } from './models/GetCompanyClientsRequest';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    getCompanyClients(@Body() request: SearchClientsByCompanyRequest) {
        return this.clientsService.searchClientsByCompany(request);
    }
}
