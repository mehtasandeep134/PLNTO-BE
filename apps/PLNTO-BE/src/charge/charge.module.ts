import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import ChargeController from './charge.controller';
import StripeService from 'apps/stripe/stripe.service';

@Module({
  imports: [],
  controllers: [ChargeController],
  providers: [ChargeService, StripeService],
})
export class ChargeModule {}
