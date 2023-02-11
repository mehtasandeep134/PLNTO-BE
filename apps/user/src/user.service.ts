import { Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from 'apps/shared/events/user.event';
import { Repository } from 'typeorm';
import User from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleUserCreated(data: UserCreatedEvent) {
    console.log('user creation handling', data);
    const newUser = await this.userRepository.create(data);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
