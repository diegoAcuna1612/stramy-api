import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ServicesModule } from './services/services.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [CommonModule, UsersModule, ClientsModule, ServicesModule, SubscriptionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
