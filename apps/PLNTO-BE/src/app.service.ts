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
    // emit event to keep communication logs
    this.communicationClient.emit(
      'user_created',
      new UserCreatedEvent(createUserRequest.email, createUserRequest.password),
    );

    // emit event to keep user logs
    this.userClient.emit(
      'user_created',
      new UserCreatedEvent(createUserRequest.email, createUserRequest.password),
    );
  }

  createProducts(createProductsRequest: CreateUserRequest) {
    // emit event to keep communication logs
    this.communicationClient.emit(
      'products_created',
      new UserCreatedEvent(
        createProductsRequest.email,
        createProductsRequest.password,
      ),
    );

    // emit event to keep product logs
    this.productsClient.emit(
      'products_created',
      new ProductCreatedEvent(
        createProductsRequest.email,
        createProductsRequest.password,
      ),
    );
  }

  getProducts() {
    // emit event to keep product logs
    return this.productsClient.send({ cmd: 'get_products' }, {});
  }

  getUser() {
    // emit event to keep user logs
    return this.userClient.send({ cmd: 'get_user' }, {});
  }
}
