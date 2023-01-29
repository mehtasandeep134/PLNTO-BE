import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import ChargeController from './charge.controller';
import StripeService from 'apps/stripe/stripe.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  controllers: [ChargeController],
  providers: [ChargeService, StripeService],
})
export class ChargeModule {}
