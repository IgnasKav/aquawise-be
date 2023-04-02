import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '../auth/dto/registerRequest.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async saveUser(request: RegisterRequestDto) {
    request.password = await hash(request.password, 12);
    return this.userRepository.save(request);
  }

  async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return user;
  }
}
