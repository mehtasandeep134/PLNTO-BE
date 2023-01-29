import { Body, Controller, Post, Req } from '@nestjs/common';
import RequestWithUser from 'apps/shared/requestWithUser.interface';
import StripeService from 'apps/stripe/stripe.service';
import CreateChargeDto from './createCharge.dto';

@Controller('charge')
export default class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
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
