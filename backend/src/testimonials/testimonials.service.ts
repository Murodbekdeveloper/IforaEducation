import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { TestimonialModel } from '../generated/prisma/models';

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  text: string;
  approved: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Nilufar Rashidova',
    course: 'Kesish va tikish asoslari',
    rating: 5,
    text: 'Uch oy ichida noldan boshlab oʻzim uchun koʻylak tika oladigan boʻldim. Ustozlar juda sabrli va tushunarli tushuntirishadi.',
    approved: true,
  },
  {
    id: '2',
    name: 'Madina Yoʻldosheva',
    course: 'Kelin koʻylagi va kechki liboslar',
    rating: 5,
    text: 'Kursdan keyin oʻz atelyemni ochdim. Ifora opaning darslari haqiqiy amaliy tajribaga asoslangan, bu eng katta afzalligi.',
    approved: true,
  },
  {
    id: '3',
    name: 'Sevinch Qodirova',
    course: 'Moda dizayni va eskiz chizish',
    rating: 4.8,
    text: 'Eskiz chizishdan tortib tayyor mahsulotgacha boʻlgan yoʻlni toʻliq tushundim. Endi oʻz kolleksiyam ustida ishlayapman.',
    approved: true,
  },
  {
    id: '4',
    name: 'Gulnoza Tursunova',
    course: 'Milliy liboslar va zardoʻzlik',
    rating: 5,
    text: 'Zardoʻzlik texnikalarini shunchalik chuqur oʻrgatishdiki, hozir buyurtmalar bilan bandman. Rahmat platformaga!',
    approved: true,
  },
];

function toTestimonial(row: TestimonialModel): Testimonial {
  return {
    id: row.id,
    name: row.name,
    course: row.course,
    rating: row.rating,
    text: row.text,
    approved: row.approved,
  };
}

@Injectable()
export class TestimonialsService {
  private readonly logger = new Logger(TestimonialsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Testimonial[]> {
    try {
      const rows = await this.prisma.testimonial.findMany({
        where: { approved: true },
      });
      if (rows.length > 0) return rows.map(toTestimonial);
    } catch (error) {
      this.logger.warn(
        `findAll() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return TESTIMONIALS;
  }

  async findAllForAdmin(): Promise<Testimonial[]> {
    const rows = await this.prisma.testimonial.findMany({
      orderBy: { id: 'desc' },
    });
    return rows.map(toTestimonial);
  }

  async create(data: {
    name: string;
    course: string;
    rating: number;
    text: string;
  }): Promise<Testimonial> {
    const row = await this.prisma.testimonial.create({
      data: { ...data, approved: false },
    });
    return toTestimonial(row);
  }

  async setApproved(id: string, approved: boolean): Promise<Testimonial> {
    const row = await this.prisma.testimonial.update({
      where: { id },
      data: { approved },
    });
    return toTestimonial(row);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.testimonial.delete({ where: { id } });
  }
}
