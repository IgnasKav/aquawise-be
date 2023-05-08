import { UserEntity, UserRole } from '../../src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

export const users: UserEntity[] = [
    new UserEntity({
        id: uuid(),
        firstName: 'Matas',
        lastName: 'Rutkauskas',
        email: 'matas@gmail.com',
        phone: '+00000000000',
        password: 'zzz123',
        userRegistrationId: uuid(),
        isRegistered: true,
        role: UserRole.Support,
    }),
    new UserEntity({
        id: uuid(),
        firstName: 'Ignas',
        lastName: 'Kavaliauskas',
        email: 'ignas@gmail.com',
        phone: '+37065289846',
        password: 'zzz123',
        userRegistrationId: uuid(),
        isRegistered: true,
        role: UserRole.Support,
    }),
];
