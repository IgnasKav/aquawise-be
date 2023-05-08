import { UserRole } from '../entities/user.entity';

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
}
