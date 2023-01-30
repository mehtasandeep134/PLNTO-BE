import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      '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',
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  public async createCustomer(name: string, email: string) {
    const customer = this.stripe.customers.create({
      name,
      email,
    });

    return customer;
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: 'INR',
      confirm: true,
    });
  }
}
