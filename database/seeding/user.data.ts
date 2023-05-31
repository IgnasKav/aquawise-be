import { UserEntity, UserRole } from '../../src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { companies } from './company.data';

export const users: UserEntity[] = [
    new UserEntity({
        id: 'ca0a10f7-da75-4dee-830d-30559216cce3',
        firstName: 'Support',
        lastName: 'Account',
        email: 'support@gmail.com',
        phone: '+37065289846',
        password: 'zzz123',
        userRegistrationId: uuid(),
        isRegistered: true,
        role: UserRole.Support,
    }),
    new UserEntity({
        id: 'f5a81e19-7b52-4f67-8628-8956166d2cb2',
        firstName: 'Admin',
        lastName: 'Account',
        email: 'admin@gmail.com',
        phone: '+37065289846',
        password: 'zzz123',
        userRegistrationId: uuid(),
        isRegistered: true,
        role: UserRole.Admin,
        company: companies[0],
    }),
];
