import dataSource from '../data-source';
import { UserEntity } from '../../src/user/entities/user.entity';
import { users as usersData } from './user.data';
import { hash } from 'bcryptjs';

async function main() {
    await dataSource.initialize();
    const userRepository = dataSource.getRepository<UserEntity>('UserEntity');

    for (const user of usersData) {
        const existingUser = await userRepository.findOne({
            where: { email: user.email },
        });

        if (existingUser) continue;

        user.password = await hash(user.password, 12);
    }

    await userRepository.save(usersData);
}

main();
