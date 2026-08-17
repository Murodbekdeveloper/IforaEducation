import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { FounderModel } from '../generated/prisma/models';

export interface Founder {
  name: string;
  role: string;
  experienceYears: number;
  studentsGraduated: number;
  bio: string;
  quote: string;
  achievements: string[];
}

const FOUNDER: Founder = {
  name: 'Ifora Isaqova',
  role: 'Platforma asoschisi, tikuvchilik ustasi',
  experienceYears: 15,
  studentsGraduated: 6000,
  bio: 'Ifora Isaqova — 15 yildan ortiq tajribaga ega tikuvchilik ustasi, Oʻzbekistonda bir nechta moda koʻrgazmalari gʻolibi. U oʻz bilim va tajribasini minglab shogirdlariga oʻrgatish maqsadida ushbu platformani asos solgan.',
  quote:
    'Har bir tikilgan choki — bu mehnat va sabr mevasi. Men sizga nafaqat kasb, balki mustaqil hayot yoʻlini oʻrgataman.',
  achievements: [
    'Milliy moda haftaligi gʻolibi, 2019',
    '6000+ shogirdni mustaqil kasb egasiga aylantirgan',
    'Xalqaro tikuvchilik sertifikatlari egasi',
  ],
};

function toFounder(row: FounderModel): Founder {
  return {
    name: row.name,
    role: row.role,
    experienceYears: row.experienceYears,
    studentsGraduated: row.studentsGraduated,
    bio: row.bio,
    quote: row.quote,
    achievements: row.achievements,
  };
}

@Injectable()
export class FounderService {
  private readonly logger = new Logger(FounderService.name);

  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Founder> {
    try {
      const row = await this.prisma.founder.findFirst();
      if (row) return toFounder(row);
    } catch (error) {
      this.logger.warn(
        `find() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return FOUNDER;
  }
}
