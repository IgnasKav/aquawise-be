import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CompanyClient, Device } from './dto/Client';
import { CompanyEntity } from '../companies/entities/company.entity';
import { ClientCreateDto } from './dto/clientCreate.dto';
import { ClientEntity } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../orders/entities/order.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
    ) {}

    async getClientsNew(companyId: string) {
        return await this.clientRepository.find({
            where: { company: { id: companyId } },
        });
    }

    async getClients(companyId: string) {
        const clients: CompanyClient[] = [];
        const companyUsersRes = await admin
            .database()
            .ref(`CompanyUsers/${companyId}`)
            .get();

        if (!companyUsersRes.val()) {
            return [];
        }

        const companyUserIds = Object.keys(companyUsersRes.val());
        await Promise.all(
            companyUserIds.map(async (userId: string) => {
                const userAuthDataResp = await admin.auth().getUser(userId);
                const userDataResp = await admin
                    .database()
                    .ref(`UsersData/${userId}`)
                    .get();
                const client = new CompanyClient({
                    email: userAuthDataResp.email,
                    ...userDataResp.val(),
                });
                client.devices = await Promise.all(
                    client.devices.map(async (device) => {
                        const fetchedDevice = await admin
                            .database()
                            .ref(`devices/${device.mac}`)
                            .get();
                        return new Device(
                            device.mac,
                            device.name,
                            fetchedDevice.val(),
                        );
                    }),
                );
                clients.push(client);
            }),
        );
        return clients;
    }

    async createClient(request: ClientCreateDto, companyId: string) {
        const newClient = new ClientEntity({
            ...request,
            company: { id: companyId } as CompanyEntity,
        });
        return this.clientRepository.save(newClient);
    }
}
