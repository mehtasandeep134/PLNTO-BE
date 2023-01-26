import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserCreatedEvent } from 'apps/events/user.event';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: UserCreatedEvent) {
    this.userService.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser() {
    return this.userService.getUser();
  }
}
