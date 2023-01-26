import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from 'apps/dto/create-user.dto';
import { ProductCreatedEvent } from 'apps/events/product.event';
import { UserCreatedEvent } from 'apps/events/user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  private readonly companies: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('PRODUCTS') private readonly productsClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new UserCreatedEvent(createUserRequest.email),
    );
    this.userClient.emit(
      'user_created',
      new UserCreatedEvent(createUserRequest.email),
    );
  }

  createProducts(createProductsRequest: CreateUserRequest) {
    this.companies.push(createProductsRequest);
    this.communicationClient.emit(
      'products_created',
      new UserCreatedEvent(createProductsRequest.email),
    );
    this.productsClient.emit(
      'products_created',
      new ProductCreatedEvent(createProductsRequest.email),
    );
  }

  getProducts() {
    return this.productsClient.send({ cmd: 'get_products' }, {});
  }

  getUser() {
    return this.userClient.send({ cmd: 'get_user' }, {});
  }
}
