import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, CourseLevel } from './course.types';
import type { CourseModel } from '../generated/prisma/models';

const COURSES: Course[] = [
  {
    id: '1',
    slug: 'kesish-va-tikish-asoslari',
    title: 'Kesish va tikish asoslari',
    description:
      "Noldan boshlab tikuvchilik kasbini egallang: o'lchov olish, andoza chizish va birinchi buyumingizni tikish.",
    category: 'Asoslar',
    level: 'Boshlangʻich',
    durationMonths: 3,
    lessonsCount: 32,
    studentsCount: 4820,
    price: 890000,
    oldPrice: 1290000,
    rating: 4.9,
    badge: 'Mashhur',
    coverColor: '#B5462F',
  },
  {
    id: '2',
    slug: 'ayollar-koylagi-dizayni',
    title: 'Ayollar koʻylagi dizayni',
    description:
      'Zamonaviy va milliy uslubdagi ayollar koʻylaklarini andozadan tayyor mahsulotgacha tikishni oʻrganing.',
    category: 'Ayollar kiyimi',
    level: 'Oʻrta',
    durationMonths: 4,
    lessonsCount: 40,
    studentsCount: 3210,
    price: 1190000,
    rating: 4.8,
    badge: 'Yangi',
    coverColor: '#7A2E3B',
  },
  {
    id: '3',
    slug: 'kelin-koylagi-va-kechki-liboslar',
    title: 'Kelin koʻylagi va kechki liboslar',
    description:
      'Korset, shleyf va nafis matolar bilan ishlashni, murakkab kelinlik konstruksiyalarini yaratishni chuqur oʻrganing.',
    category: 'Pro dizayn',
    level: 'Pro',
    durationMonths: 5,
    lessonsCount: 48,
    studentsCount: 1540,
    price: 1690000,
    oldPrice: 2190000,
    rating: 5,
    badge: 'Top kurs',
    coverColor: '#C9A227',
  },
  {
    id: '4',
    slug: 'erkaklar-kostyumi-tikish',
    title: 'Erkaklar kostyumi tikish',
    description:
      'Klassik erkaklar kostyumi, koʻylak va shim tikishning barcha bosqichlarini mutaxassislardan oʻrganing.',
    category: 'Erkaklar kiyimi',
    level: 'Oʻrta',
    durationMonths: 4,
    lessonsCount: 36,
    studentsCount: 2130,
    price: 1090000,
    rating: 4.7,
    coverColor: '#2B2320',
  },
  {
    id: '5',
    slug: 'bolalar-kiyimi-tikish',
    title: 'Bolalar kiyimi tikish',
    description:
      'Qulay va xavfsiz matolardan chaqaloq hamda maktabgacha yoshdagi bolalar uchun kiyimlar tikishni oʻrganing.',
    category: 'Bolalar kiyimi',
    level: 'Boshlangʻich',
    durationMonths: 2,
    lessonsCount: 24,
    studentsCount: 2870,
    price: 690000,
    rating: 4.8,
    coverColor: '#A63D40',
  },
  {
    id: '6',
    slug: 'milliy-liboslar-va-zardozlik',
    title: 'Milliy liboslar va zardoʻzlik',
    description:
      "Oʻzbek milliy liboslarini an'anaviy zardoʻzlik texnikalari bilan bezash va tikishni mukammal egallang.",
    category: 'Milliy liboslar',
    level: 'Pro',
    durationMonths: 4,
    lessonsCount: 34,
    studentsCount: 980,
    price: 1290000,
    rating: 4.9,
    badge: 'Ustoz tanlovi',
    coverColor: '#8C5A2B',
  },
  {
    id: '7',
    slug: 'trikotaj-kiyim-tikish',
    title: 'Trikotaj kiyim tikish',
    description:
      'Overlok va trikotaj mashinalarida ishlash, choʻzluvchan matolardan sport va kundalik kiyimlar tikish.',
    category: 'Trikotaj',
    level: 'Oʻrta',
    durationMonths: 3,
    lessonsCount: 28,
    studentsCount: 1670,
    price: 890000,
    rating: 4.6,
    coverColor: '#4A5043',
  },
  {
    id: '8',
    slug: 'moda-dizayni-va-eskiz-chizish',
    title: 'Moda dizayni va eskiz chizish',
    description:
      'Oʻz kolleksiyangizni yaratish uchun moda eskizlari chizish, rang va siluet tanlash sirlarini oʻrganing.',
    category: 'Dizayn',
    level: 'Boshlangʻich',
    durationMonths: 2,
    lessonsCount: 20,
    studentsCount: 2260,
    price: 590000,
    rating: 4.7,
    badge: 'Yangi',
    coverColor: '#6B3A5C',
  },
];

function toCourse(row: CourseModel): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    level: row.level as CourseLevel,
    durationMonths: row.durationMonths,
    lessonsCount: row.lessonsCount,
    studentsCount: row.studentsCount,
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    rating: row.rating,
    badge: row.badge ?? undefined,
    coverColor: row.coverColor,
  };
}

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    try {
      const rows = await this.prisma.course.findMany({
        orderBy: { createdAt: 'asc' },
      });
      if (rows.length > 0) return rows.map(toCourse);
    } catch (error) {
      this.logger.warn(
        `findAll() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return COURSES;
  }

  async findBySlug(slug: string): Promise<Course | undefined> {
    try {
      const row = await this.prisma.course.findUnique({ where: { slug } });
      if (row) return toCourse(row);
    } catch (error) {
      this.logger.warn(
        `findBySlug() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return COURSES.find((course) => course.slug === slug);
  }

  async create(
    data: Omit<Course, 'id' | 'studentsCount'> & { studentsCount?: number },
  ): Promise<Course> {
    const row = await this.prisma.course.create({
      data: { ...data, studentsCount: data.studentsCount ?? 0 },
    });
    return toCourse(row);
  }

  async update(id: string, data: Partial<Omit<Course, 'id'>>): Promise<Course> {
    const row = await this.prisma.course.update({ where: { id }, data });
    return toCourse(row);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }
}
