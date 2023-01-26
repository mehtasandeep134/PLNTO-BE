import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from 'apps/events/user.event';

@Injectable()
export class UserService {
  private readonly user: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: UserCreatedEvent) {
    console.log('user creation handling', data);
    this.user.push({
      email: data.email,
      timestamp: Date.now(),
    });
  }

  getUser() {
    return this.user;
  }
}
