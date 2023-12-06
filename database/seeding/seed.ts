import { createDataSourceOptions } from '../data-source';
import { UserEntity } from '../../src/user/entities/user.entity';
import { users as usersData } from './user.data';
import { companies } from './company.data';
import { hash } from 'bcryptjs';
import { CompanyEntity } from '../../src/companies/entities/company.entity';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(createDataSourceOptions());

async function main() {
    await dataSource.initialize();
    await createCompanies();
    await createUsers();
}

const createCompanies = async () => {
    const companyRepository =
        dataSource.getRepository<CompanyEntity>('CompanyEntity');

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

    for (const user of usersData) {
        const existingUser = await userRepository.findOne({
            where: { email: user.email },
        });

        if (existingUser) continue;

        user.password = await hash(user.password, 12);

        await userRepository.save(user);
    }
};

main();
