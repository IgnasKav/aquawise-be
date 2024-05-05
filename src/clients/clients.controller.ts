import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
}
