import { createDataSourceOptions } from '../data-source';
import { UserEntity } from '../../src/user/entities/user.entity';
import { users as usersData } from './data/user.data';
import { companies } from './data/company.data';
import { hash } from 'bcryptjs';
import { CompanyEntity } from '../../src/companies/entities/company.entity';
import { DataSource } from 'typeorm';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { CompanyClientRelationEntity } from 'src/companies/entities/company-client-relation.entity';

const dataSource = new DataSource(createDataSourceOptions());

async function main() {
    await dataSource.initialize();
    await createCompanies();
    await createUsers();
    await createClients();
}

const createCompanies = async () => {
    const companyRepository =
        dataSource.getRepository<CompanyEntity>('CompanyEntity');

    const savedCompanies = await companyRepository.find({ take: 2 });

    if (savedCompanies.length > 0) return;

    for (const company of companies) {
        const existingCompany = await companyRepository.findOne({
            where: { email: company.email },
        });

        if (existingCompany) continue;

        await companyRepository.save(company);
    }
};

const createUsers = async () => {
    const userRepository = dataSource.getRepository<UserEntity>('UserEntity');

    const savedUsers = await userRepository.find({ take: 2 });

    if (savedUsers.length > 0) return;

    for (const user of usersData) {
        const existingUser = await userRepository.findOne({
            where: { email: user.email },
        });

        if (existingUser) continue;

        user.password = await hash(user.password, 12);

        await userRepository.save(user);
    }
};

const createClients = async () => {
    const clientRepo = dataSource.getRepository<ClientEntity>('ClientEntity');
    const companyRepo =
        dataSource.getRepository<CompanyEntity>('CompanyEntity');
    const relationRepo = dataSource.getRepository<CompanyClientRelationEntity>(
        'CompanyClientRelationEntity',
    );

    const existingClients = await clientRepo.find({ take: 2 });

    if (existingClients.length > 0) return;

    const savedCompanies = await companyRepo.find({ take: 2 });

    if (savedCompanies.length === 0) return;

    const clientsToSave: ClientEntity[] = [];

    for (let i = 0; i < 20; i++) {
        const isCompany = i % 3 === 0;

        const id = uuid();

        const client = new ClientEntity({
            id: id,
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            type: isCompany ? 'company' : 'person',
        });

        client.name = isCompany
            ? faker.company.name()
            : faker.person.fullName();

        clientsToSave.push(client);
    }

    const savedClients = await clientRepo.save(clientsToSave);

    const relationsToSave: CompanyClientRelationEntity[] = [];

    for (const client of savedClients) {
        const relation = new CompanyClientRelationEntity({
            id: uuid(),
            clientId: client.id,
            companyId: savedCompanies[0].id,
        });

        relationsToSave.push(relation);
    }

    await relationRepo.save(relationsToSave);
};

main();
