import { Injectable } from '@nestjs/common';
import { ProductCreatedEvent } from 'apps/events/product.event';

@Injectable()
export class ProductsService {
  private readonly product: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  handleProductCreated(data: ProductCreatedEvent) {
    console.log('product creation handling', data);
    this.product.push({
      email: data.email,
      timestamp: Date.now(),
    });
  }

  getProduct() {
    return this.product;
  }
}
