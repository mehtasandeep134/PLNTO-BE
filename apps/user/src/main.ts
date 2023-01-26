import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3302,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3302);
}
bootstrap();
