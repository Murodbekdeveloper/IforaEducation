import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

type UserRole = 'STUDENT' | 'ADMIN';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [
      studentsCount,
      adminsCount,
      ordersConfirmed,
      ordersPending,
      revenueAgg,
      leadsUncontacted,
      messagesUnread,
      testimonialsPending,
      coursesCount,
      liveSessionsLive,
    ] = await Promise.all([
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
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
      this.prisma.liveSession.count({ where: { status: 'LIVE' } }),
    ]);

    return {
      studentsCount,
      adminsCount,
      ordersConfirmed,
      ordersPending,
      revenueTotal: revenueAgg._sum.amount ?? 0,
      leadsUncontacted,
      messagesUnread,
      testimonialsPending,
      coursesCount,
      liveSessionsLive,
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
      avatarInitial: u.avatarInitial,
      joinedAt: u.joinedAt.toISOString(),
      enrollmentsCount: u._count.enrollments,
      ordersCount: u._count.orders,
    }));
  }

  async getUserDetail(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            course: { select: { title: true, slug: true, coverColor: true } },
          },
        },
        orders: {
          include: { course: { select: { title: true, slug: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      avatarInitial: user.avatarInitial,
      joinedAt: user.joinedAt.toISOString(),
      role: user.role,
      hasPassword: Boolean(user.passwordHash),
      enrollments: user.enrollments.map((e) => ({
        id: e.id,
        courseTitle: e.course.title,
        courseSlug: e.course.slug,
        coverColor: e.course.coverColor,
        progressPercent: e.progressPercent,
        completedLessons: e.completedLessons,
        totalLessons: e.totalLessons,
        nextLesson: e.nextLesson,
        completedAt: e.completedAt ? e.completedAt.toISOString() : null,
      })),
      orders: user.orders.map((o) => ({
        id: o.id,
        courseTitle: o.course.title,
        courseSlug: o.course.slug,
        amount: o.amount,
        status: o.status,
        createdAt: o.createdAt.toISOString(),
      })),
    };
  }

  async setUserPassword(id: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await this.prisma.user.update({ where: { id }, data: { passwordHash } });

    return { success: true };
  }

  async removeEnrollment(enrollmentId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });
    if (!enrollment) {
      throw new NotFoundException('Roʻyxatga olish topilmadi.');
    }

    await this.prisma.enrollment.delete({ where: { id: enrollmentId } });

    return { success: true };
  }

  async getPayments() {
    const DUE_INTERVAL_DAYS = 30;
    const DUE_SOON_WINDOW_DAYS = 5;
    const now = Date.now();

    const users = await this.prisma.user.findMany({
      where: { role: 'STUDENT', orders: { some: {} } },
      include: {
        orders: {
          include: {
            course: {
              select: { id: true, title: true, slug: true, price: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        enrollments: { select: { courseId: true, completedAt: true } },
      },
    });

    return users
      .map((u) => {
        const completedCourseIds = new Set(
          u.enrollments.filter((e) => e.completedAt).map((e) => e.courseId),
        );

        const byCourse = new Map<
          string,
          {
            courseId: string;
            courseTitle: string;
            courseSlug: string;
            coursePrice: number;
            paidAmount: number;
            ordersCount: number;
            lastPaymentAt: Date | null;
          }
        >();

        for (const o of u.orders) {
          const key = o.courseId;
          if (!byCourse.has(key)) {
            byCourse.set(key, {
              courseId: o.courseId,
              courseTitle: o.course.title,
              courseSlug: o.course.slug,
              coursePrice: o.course.price,
              paidAmount: 0,
              ordersCount: 0,
              lastPaymentAt: null,
            });
          }
          const entry = byCourse.get(key)!;
          entry.ordersCount += 1;
          if (o.status === 'CONFIRMED') {
            entry.paidAmount += o.amount;
            if (!entry.lastPaymentAt || o.createdAt > entry.lastPaymentAt) {
              entry.lastPaymentAt = o.createdAt;
            }
          }
        }

        const courses = Array.from(byCourse.values()).map((c) => {
          const paidPercent =
            c.coursePrice > 0
              ? Math.min(100, Math.round((c.paidAmount / c.coursePrice) * 100))
              : 0;
          const completed = completedCourseIds.has(c.courseId);

          let dueSoon = false;
          let overdue = false;
          let nextDueAt: Date | null = null;

          if (
            !completed &&
            paidPercent > 0 &&
            paidPercent < 100 &&
            c.lastPaymentAt
          ) {
            nextDueAt = new Date(c.lastPaymentAt);
            nextDueAt.setDate(nextDueAt.getDate() + DUE_INTERVAL_DAYS);
            const daysUntilDue = (nextDueAt.getTime() - now) / 86_400_000;
            if (daysUntilDue < 0) overdue = true;
            else if (daysUntilDue <= DUE_SOON_WINDOW_DAYS) dueSoon = true;
          }

          return {
            courseId: c.courseId,
            courseTitle: c.courseTitle,
            courseSlug: c.courseSlug,
            coursePrice: c.coursePrice,
            paidAmount: c.paidAmount,
            paidPercent,
            ordersCount: c.ordersCount,
            lastPaymentAt: c.lastPaymentAt
              ? c.lastPaymentAt.toISOString()
              : null,
            nextDueAt: nextDueAt ? nextDueAt.toISOString() : null,
            completed,
            dueSoon,
            overdue,
          };
        });

        return {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          phone: u.phone,
          email: u.email,
          avatarInitial: u.avatarInitial,
          totalPaid: courses.reduce((sum, c) => sum + c.paidAmount, 0),
          hasDueSoon: courses.some((c) => c.dueSoon || c.overdue),
          hasCompleted: courses.some((c) => c.completed),
          courses,
          orders: u.orders.map((o) => ({
            id: o.id,
            courseTitle: o.course.title,
            courseSlug: o.course.slug,
            amount: o.amount,
            status: o.status,
            createdAt: o.createdAt.toISOString(),
          })),
        };
      })
      .sort((a, b) => b.totalPaid - a.totalPaid);
  }

  async getAdmins() {
    const admins = await this.prisma.user.findMany({
      where: { role: 'ADMIN' },
      orderBy: { joinedAt: 'asc' },
    });

    return admins.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone,
      email: u.email,
      avatarInitial: u.avatarInitial,
      joinedAt: u.joinedAt.toISOString(),
    }));
  }

  async getCompletions() {
    const completions = await this.prisma.enrollment.findMany({
      where: { completedAt: { not: null } },
      select: { id: true, completedAt: true },
      orderBy: { completedAt: 'asc' },
    });

    return completions.map((c) => ({
      id: c.id,
      completedAt: c.completedAt!.toISOString(),
    }));
  }

  async setUserRole(id: string, role: UserRole) {
    if (role === 'STUDENT') {
      const target = await this.prisma.user.findUnique({ where: { id } });
      if (target?.role === 'ADMIN') {
        const adminCount = await this.prisma.user.count({
          where: { role: 'ADMIN' },
        });
        if (adminCount <= 1) {
          throw new BadRequestException(
            'Kamida bitta admin hisobi qolishi shart.',
          );
        }
      }
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    return {
      id: updated.id,
      firstName: updated.firstName,
      lastName: updated.lastName,
      phone: updated.phone,
      email: updated.email,
      avatarInitial: updated.avatarInitial,
      joinedAt: updated.joinedAt.toISOString(),
      role: updated.role,
    };
  }
}
