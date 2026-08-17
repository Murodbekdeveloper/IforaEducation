import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { PlatformStatModel } from '../generated/prisma/models';

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { id: 'students', value: 12400, suffix: '+', label: 'Talaba' },
  { id: 'mentors', value: 25, suffix: '+', label: 'Tajribali ustozlar' },
  { id: 'courses', value: 40, suffix: '+', label: 'Kurs yoʻnalishi' },
  { id: 'satisfaction', value: 98, suffix: '%', label: 'Mamnun bitiruvchilar' },
];

function toStat(row: PlatformStatModel): Stat {
  return {
    id: row.key,
    value: row.value,
    suffix: row.suffix,
    label: row.label,
  };
}

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Stat[]> {
    try {
      const rows = await this.prisma.platformStat.findMany();
      if (rows.length > 0) return rows.map(toStat);
    } catch (error) {
      this.logger.warn(
        `findAll() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return STATS;
  }
}
