import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { BlogPostModel } from '../generated/prisma/models';
import { BlogPost } from './blog.types';

const POSTS: BlogPost[] = [
  {
    slug: 'tikuvchilikni-qayerdan-boshlash-kerak',
    title: 'Tikuvchilikni qayerdan boshlash kerak?',
    excerpt:
      'Noldan tikuvchilikni oʻrganmoqchi boʻlganlar uchun birinchi qadamlar: kerakli asboblar va mashq tartibi.',
    content:
      'Tikuvchilikni oʻrganish uchun eng avvalo oddiy tikuv mashinasi, qaychi va oʻlchov lentasi kifoya. Birinchi haftalarda toʻgʻri chiziq boʻylab tikishni, keyin esa oddiy andozalar bilan ishlashni mashq qiling. Sabr va muntazam mashq — muvaffaqiyat kaliti.',
    coverColor: '#B5462F',
    publishedAt: '2026-06-01T00:00:00.000Z',
  },
  {
    slug: 'togri-olchov-olish-sirlari',
    title: 'Toʻgʻri oʻlchov olish sirlari',
    excerpt:
      'Har qanday buyum sifatli chiqishi uchun eng muhim bosqich — toʻgʻri oʻlchov olish. Asosiy nuqtalarni bilib oling.',
    content:
      'Oʻlchov olishda tana holati tik boʻlishi, lenta esa juda qattiq yoki boʻsh boʻlmasligi kerak. Ko‘krak, bel va son aylanalarini, shuningdek yengsiz uzunlikni toʻgʻri oʻlchash kelajakdagi barcha andozalar uchun asos boʻladi.',
    coverColor: '#7A2E3B',
    publishedAt: '2026-06-08T00:00:00.000Z',
  },
  {
    slug: 'ozini-tikuvchi-sifatida-qanday-rivojlantirish',
    title: 'Oʻzini tikuvchi sifatida qanday rivojlantirish mumkin?',
    excerpt:
      'Kursni tugatgach ham oʻsishni davom ettirish uchun amaliy maslahatlar va mashq rejasi.',
    content:
      'Doimiy amaliyot, yangi texnikalarni oʻrganish va real buyurtmalar bilan ishlash — professional darajaga koʻtarilishning eng tez yoʻli. Har oyda kamida bitta yangi buyum tikishga harakat qiling.',
    coverColor: '#6B3A5C',
    publishedAt: '2026-06-15T00:00:00.000Z',
  },
];

function toBlogPost(row: BlogPostModel): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverColor: row.coverColor,
    publishedAt: row.publishedAt.toISOString(),
  };
}

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BlogPost[]> {
    try {
      const rows = await this.prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' },
      });
      if (rows.length > 0) return rows.map(toBlogPost);
    } catch (error) {
      this.logger.warn(
        `findAll() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return POSTS;
  }

  async findBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const row = await this.prisma.blogPost.findUnique({ where: { slug } });
      if (row) return toBlogPost(row);
    } catch (error) {
      this.logger.warn(
        `findBySlug() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return POSTS.find((p) => p.slug === slug);
  }

  async findAllForAdmin() {
    const rows = await this.prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return rows.map((row) => ({ id: row.id, ...toBlogPost(row) }));
  }

  async create(data: Omit<BlogPost, 'publishedAt'>): Promise<BlogPost> {
    const row = await this.prisma.blogPost.create({ data });
    return toBlogPost(row);
  }

  async update(
    id: string,
    data: Partial<Omit<BlogPost, 'publishedAt'>>,
  ): Promise<BlogPost> {
    const row = await this.prisma.blogPost.update({ where: { id }, data });
    return toBlogPost(row);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.blogPost.delete({ where: { id } });
  }
}
