import { Module} from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './modules/prisma/prisma.module';
import KeyvRedis from '@keyv/redis';
import { env } from 'process';
import { TestModule } from './modules/test/test.module';
@Module({
  imports: [CacheModule.registerAsync({
    isGlobal: true,
      useFactory: async () => {
        return {
          ttl: 5000,
          stores: [
            new KeyvRedis(env.REDIS_URL),
          ],
        };
      },
    }),PrismaModule,CommonModule, UsersModule, TestModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {

}
