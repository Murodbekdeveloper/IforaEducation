import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, Lead } from './lead.types';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private readonly inMemoryLeads: Lead[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    try {
      const row = await this.prisma.lead.create({ data: dto });
      return {
        id: row.id,
        phone: row.phone,
        telegramUsername: row.telegramUsername ?? undefined,
        courseSlug: row.courseSlug ?? undefined,
        contacted: row.contacted,
        createdAt: row.createdAt.toISOString(),
      };
    } catch (error) {
      this.logger.warn(
        `create() falling back to in-memory storage: ${(error as Error).message}`,
      );
    }

    const lead: Lead = {
      id: randomUUID(),
      contacted: false,
      createdAt: new Date().toISOString(),
      ...dto,
    };
    this.inMemoryLeads.push(lead);
    return lead;
  }

  async findAll(): Promise<Lead[]> {
    try {
      const rows = await this.prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return rows.map((row) => ({
        id: row.id,
        phone: row.phone,
        telegramUsername: row.telegramUsername ?? undefined,
        courseSlug: row.courseSlug ?? undefined,
        contacted: row.contacted,
        createdAt: row.createdAt.toISOString(),
      }));
    } catch (error) {
      this.logger.warn(
        `findAll() falling back to in-memory storage: ${(error as Error).message}`,
      );
      return this.inMemoryLeads;
    }
  }

  async markContacted(id: string, contacted: boolean) {
    return this.prisma.lead.update({ where: { id }, data: { contacted } });
  }
}
