import {
    CompanyEntity,
    CompanyStatus,
} from '../../../src/companies/entities/company.entity';

export const companies: CompanyEntity[] = [
    {
        id: '1922e9da-bf6b-4637-94a7-25586a4d4240',
        name: 'Kampanija',
        code: '123',
        phone: '+37065289846',
        email: 'company@gmail.com',
        status: CompanyStatus.Confirmed,
        brandColor: 'blue',
    },
];
