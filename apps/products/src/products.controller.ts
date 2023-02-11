import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductCreatedEvent } from 'apps/shared/events/product.event';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getHello(): string {
    return this.productsService.getHello();
  }
  @EventPattern('products_created')
  handleProductCreated(data: ProductCreatedEvent) {
    this.productsService.handleProductCreated(data);
  }

  @MessagePattern({ cmd: 'get_products' })
  getProducts() {
    return this.productsService.getProduct();
  }
}
