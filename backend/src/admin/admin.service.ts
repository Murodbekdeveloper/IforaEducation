import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [
      studentsCount,
      ordersConfirmed,
      ordersPending,
      revenueAgg,
      leadsUncontacted,
      messagesUnread,
      testimonialsPending,
      coursesCount,
    ] = await Promise.all([
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.order.count({ where: { status: 'CONFIRMED' } }),
      this.prisma.order.count({ where: { status: 'PENDING' } }),
      this.prisma.order.aggregate({
        where: { status: 'CONFIRMED' },
        _sum: { amount: true },
      }),
      this.prisma.lead.count({ where: { contacted: false } }),
      this.prisma.contactMessage.count({ where: { read: false } }),
      this.prisma.testimonial.count({ where: { approved: false } }),
      this.prisma.course.count(),
    ]);

    return {
      studentsCount,
      ordersConfirmed,
      ordersPending,
      revenueTotal: revenueAgg._sum.amount ?? 0,
      leadsUncontacted,
      messagesUnread,
      testimonialsPending,
      coursesCount,
    };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      orderBy: { joinedAt: 'desc' },
      include: { _count: { select: { enrollments: true, orders: true } } },
    });

    return users.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone,
      email: u.email,
      joinedAt: u.joinedAt.toISOString(),
      enrollmentsCount: u._count.enrollments,
      ordersCount: u._count.orders,
    }));
  }
}
