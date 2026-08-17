import { Controller, Get } from '@nestjs/common';

@Controller('payment-info')
export class PaymentController {
  @Get()
  find() {
    return {
      cardNumber: process.env.PAYMENT_CARD_NUMBER ?? '',
      cardHolder: process.env.PAYMENT_CARD_HOLDER ?? '',
      cardExpiry: process.env.PAYMENT_CARD_EXPIRY ?? '',
    };
  }
}
