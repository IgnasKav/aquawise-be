import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CompaniesModule } from '../companies/companies.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), CompaniesModule],
    exports: [UsersService],
    providers: [UsersService],
})
export class UsersModule {}
