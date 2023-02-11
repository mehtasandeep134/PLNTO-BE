import { Injectable } from '@nestjs/common';
import { ProductCreatedEvent } from 'apps/shared/events/product.event';
import { UserCreatedEvent } from 'apps/shared/events/user.event';

@Injectable()
export class CommunicationService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: UserCreatedEvent) {
    console.log('handle User created - COMMUNICATION', data);
  }

  handleProductsCreated(data: ProductCreatedEvent) {
    console.log('handle Products created - COMMUNICATION', data);
  }
}
