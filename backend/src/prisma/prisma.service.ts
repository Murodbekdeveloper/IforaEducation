import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  readonly isConfigured = Boolean(process.env.DATABASE_URL);

  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL ?? '',
      }),
    });
  }

  async onModuleInit() {
    if (!this.isConfigured) {
      this.logger.warn(
        'DATABASE_URL is not set — running on in-memory demo data. Set DATABASE_URL and run `npx prisma migrate dev` to enable persistence.',
      );
      return;
    }

    try {
      await this.$connect();
      this.logger.log('Connected to the database');
    } catch (error) {
      this.logger.warn(
        `Could not connect to the database (${(error as Error).message}). Falling back to in-memory demo data.`,
      );
    }
  }

  async onModuleDestroy() {
    if (this.isConfigured) {
      await this.$disconnect().catch(() => undefined);
    }
  }
}
