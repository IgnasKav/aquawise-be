import { UserRole } from '../entities/user.entity';
import { CompanyEntity } from '../../companies/entities/company.entity';

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    company?: CompanyEntity;
}
