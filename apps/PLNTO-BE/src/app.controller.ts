import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from 'apps/dto/create-user.dto';
import { CreateProductsRequest } from 'apps/dto/created-products.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('user')
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);
  }

  @Post('products')
  createProducts(@Body() createproductsRequest: CreateProductsRequest) {
    this.appService.createProducts(createproductsRequest);
  }

  @Get('products_created')
  getProducts() {
    return this.appService.getProducts();
  }

  @Get('user_created')
  getUser() {
    return this.appService.getUser();
  }
}
