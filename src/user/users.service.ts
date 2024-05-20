import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserFiltersEntity } from './entities/user-filter.entity';
import { UserFilterSaveRequest } from './dto/user-filter-save-request';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private dataSource: DataSource,
    ) {}

    async saveUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async findById(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: { id: id },
            relations: { company: true },
        });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
            relations: { company: true },
        });
    }

    async getUserFilters(userId: string): Promise<object> {
        const userFiltersRepo =
            this.dataSource.getRepository(UserFiltersEntity);

        const resp = await userFiltersRepo.findOne({
            where: {
                userId,
            },
        });

        const filters = JSON.parse(resp.filterJSON);

        return filters;
    }

    async saveUserFilters(userId: string, req: UserFilterSaveRequest) {
        const userFiltersRepo =
            this.dataSource.getRepository(UserFiltersEntity);

        const existingFilter = await userFiltersRepo.findOne({
            where: {
                userId,
                scope: req.scope,
            },
        });

        if (existingFilter === null) {
            await userFiltersRepo.save({
                id: uuid(),
                scope: req.scope,
                filterJSON: JSON.stringify(req.filter),
                userId,
            });

            return;
        }

        existingFilter.scope = req.scope;
        existingFilter.filterJSON = JSON.stringify(req.filter);

        await userFiltersRepo.save(existingFilter);
    }
}
