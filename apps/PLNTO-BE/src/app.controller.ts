import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserRequest } from 'apps/dto/create-user.dto';
import { CreateProductsRequest } from 'apps/dto/created-products.dto';
import RequestWithUser from 'apps/shared/requestWithUser.interface';
import StripeService from 'apps/stripe/stripe.service';
import { AppService } from './app.service';
import CreateChargeDto from './charge/createCharge.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly stripeService: StripeService,
  ) {}

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

  @Post('charge')
  async createCharge(
    @Body() charge: CreateChargeDto,
    @Req() request: RequestWithUser,
  ) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }
}
