import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3301,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3301);
}
bootstrap();
