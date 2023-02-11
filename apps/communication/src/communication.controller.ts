import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices/decorators';
import { ProductCreatedEvent } from 'apps/shared/events/product.event';
import { UserCreatedEvent } from 'apps/shared/events/user.event';
import { CommunicationService } from './communication.service';

@Controller()
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get()
  getHello(): string {
    return this.communicationService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: UserCreatedEvent) {
    this.communicationService.handleUserCreated(data);
  }

  @EventPattern('products_created')
  handleProductsCreated(data: ProductCreatedEvent) {
    this.communicationService.handleProductsCreated(data);
  }
}
