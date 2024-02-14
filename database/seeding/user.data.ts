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
        role: 'support',
        company: companies[0],
    }),
    new UserEntity({
        id: 'f5a81e19-7b52-4f67-8628-8956166d2cb2',
        firstName: 'Admin',
        lastName: 'Account',
        email: 'admin@gmail.com',
        phone: '+37065289846',
        password: 'zzz123',
        userRegistrationId: uuid(),
        role: 'admin',
        company: companies[0],
    }),
    new UserEntity({
        id: '44933c64-76b8-475e-960a-6428c206dbd8',
        firstName: 'User',
        lastName: 'Account',
        email: 'user@gmail.com',
        phone: '+37065289846',
        password: 'zzz123',
        userRegistrationId: uuid(),
        role: 'user',
        company: companies[0],
    }),
];
