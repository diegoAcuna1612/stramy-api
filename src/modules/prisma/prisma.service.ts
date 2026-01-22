import { Injectable,Logger,OnModuleDestroy,OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client/index';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy {
    private readonly logger = new Logger('Stramy - App');
    constructor() {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool, { schema: 'public' });
        super({ adapter });

    }
    async onModuleInit() {
        try {
      await this.$connect();
      this.logger.log('Database Connected');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error.stack);
      throw error;
    }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Database Disconnected');
    }
}