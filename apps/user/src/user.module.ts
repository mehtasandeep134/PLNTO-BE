import { Module } from '@nestjs/common';
import { DatabaseDBModule } from 'apps/database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseDBModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
