import { Injectable } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
    ) {}
}
