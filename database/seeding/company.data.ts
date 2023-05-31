import {
    CompanyEntity,
    CompanyStatus,
} from '../../src/companies/entities/company.entity';

export const companies: CompanyEntity[] = [
    new CompanyEntity({
        id: '6a27b55f-8945-49cb-9379-a7b52d7a39c7',
        name: 'Kampanija',
        code: '123',
        phone: '+37065289846',
        email: 'company@gmail.com',
        status: CompanyStatus.Confirmed,
        brandColor: 'blue',
    }),
];
