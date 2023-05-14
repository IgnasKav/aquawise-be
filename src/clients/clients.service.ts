import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CompanyClient, Device } from './dto/Client';

@Injectable()
export class ClientsService {
    async getClients(companyId: string) {
        const clients: CompanyClient[] = [];
        const companyUsersRes = await admin
            .database()
            .ref(`CompanyUsers/${companyId}`)
            .get();
        await Promise.all(
            Object.keys(companyUsersRes.val()).map(async (userId: string) => {
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
}
