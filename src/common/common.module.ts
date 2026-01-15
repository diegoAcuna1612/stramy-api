import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CommonController } from './common.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
@Module({
  controllers: [CommonController],
  providers: [LoggerMiddleware],
})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        {
          path: 'common/status',
          method: RequestMethod.GET,
        },
        {
          path: 'common/notfound',
          method: RequestMethod.GET,
        },
        {
          path: 'common/error',
          method: RequestMethod.GET,
        },
        {
          path: 'common/status/:status',
          method: RequestMethod.GET,
        },
        {
          path: 'common/ticket/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
