import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { OrderStatus } from '../generated/prisma/enums';
import { StudentService } from '../student/student.service';
import { getDiscountPercent } from '../student/reward-tiers';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentService: StudentService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    const course = await this.prisma.course.findUnique({
      where: { slug: dto.courseSlug },
    });
    if (!course) {
      throw new NotFoundException(`Course "${dto.courseSlug}" not found`);
    }

    const totalPoints = await this.studentService.getTotalPoints(userId);
    const discountPercent = getDiscountPercent(totalPoints);
    const amount =
      discountPercent > 0
        ? Math.round((course.price * (100 - discountPercent)) / 100 / 1000) *
          1000
        : course.price;

    const order = await this.prisma.order.create({
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        amount,
        userId,
        courseId: course.id,
      },
    });

    await this.prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId: course.id } },
      update: {},
      create: {
        userId,
        courseId: course.id,
        progressPercent: 0,
        completedLessons: 0,
        totalLessons: course.lessonsCount,
        nextLesson: 'Kirish',
        results: [],
      },
    });

    return order;
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { course: { select: { title: true, slug: true } } },
    });

    return orders.map((o) => ({
      id: o.id,
      fullName: o.fullName,
      phone: o.phone,
      amount: o.amount,
      status: o.status,
      createdAt: o.createdAt.toISOString(),
      courseTitle: o.course.title,
      courseSlug: o.course.slug,
    }));
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order "${id}" not found`);
    }

    if (status === 'CANCELLED' && order.userId) {
      await this.prisma.enrollment
        .delete({
          where: {
            userId_courseId: { userId: order.userId, courseId: order.courseId },
          },
        })
        .catch(() => undefined);
    }

    return this.prisma.order.update({ where: { id }, data: { status } });
  }
}
