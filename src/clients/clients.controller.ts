import { Body, Controller, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsSearchRequest } from './models/company-clients-search-request';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    searchClientsByCompany(@Body() request: ClientsSearchRequest) {
        return this.clientsService.searchClientsByCompany(request);
    }
}
