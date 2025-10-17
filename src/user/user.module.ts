import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GamerController } from './gamer.controller';

@Module({
  controllers: [UserController, GamerController]
})
export class UserModule {}
