import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from 'apps/events/user.event';
import StripeService from 'apps/stripe/stripe.service';
import { FindOneOptions, Repository } from 'typeorm';
import User from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private stripeService: StripeService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      email,
    } as FindOneOptions<User>);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: User) {
    const stripeCustomer = await this.stripeService.createCustomer(
      userData.name,
      userData.email,
    );

    const newUser = await this.userRepository.create({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
    });
    await this.userRepository.save(newUser);
    return newUser;
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
