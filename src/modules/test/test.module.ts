import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UsersModule } from '../users/users.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';
@Module({
  controllers: [TestController],
  imports: [UsersModule,BcryptModule]
})
export class TestModule {}
