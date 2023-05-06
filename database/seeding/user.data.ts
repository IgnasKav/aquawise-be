import { UserEntity, UserRole } from '../../src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

export const users: UserEntity[] = [
    new UserEntity({
        id: uuid(),
        firstName: 'Matas',
        lastName: 'Rutkauskas',
        email: 'matas@gmail.com',
        password: 'zzz123',
        registrationId: uuid(),
        isEmailConfirmed: true,
        role: UserRole.Support,
    }),
];
