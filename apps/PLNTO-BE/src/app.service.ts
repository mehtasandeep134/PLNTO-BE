import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from 'apps/dto/create-user.dto';
import { ProductCreatedEvent } from 'apps/events/product.event';
import { UserCreatedEvent } from 'apps/events/user.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('PRODUCTS') private readonly productsClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.communicationClient.emit(
      'user_created',
      new UserCreatedEvent(createUserRequest.email, createUserRequest.password),
    );
    this.userClient.emit(
      'user_created',
      new UserCreatedEvent(createUserRequest.email, createUserRequest.password),
    );
  }

  createProducts(createProductsRequest: CreateUserRequest) {
    this.communicationClient.emit(
      'products_created',
      new UserCreatedEvent(
        createProductsRequest.email,
        createProductsRequest.password,
      ),
    );
    this.productsClient.emit(
      'products_created',
      new ProductCreatedEvent(
        createProductsRequest.email,
        createProductsRequest.password,
      ),
    );
  }

  getProducts() {
    return this.productsClient.send({ cmd: 'get_products' }, {});
  }

  getUser() {
    return this.userClient.send({ cmd: 'get_user' }, {});
  }
}
