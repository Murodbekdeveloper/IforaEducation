import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  EnrollmentModel,
  NotificationModel,
  ScheduleItemModel,
  UserModel,
} from '../generated/prisma/models';
import {
  CourseResult,
  EnrolledCourse,
  NotificationItem,
  ResultRow,
  ScheduleItem,
  StudentProfile,
  StudentProgressRing,
  StudentStat,
} from './student.types';

const PROFILE: StudentProfile = {
  firstName: 'Mohira',
  lastName: 'Yusupova',
  phone: '+998 90 123 45 67',
  email: 'mohira.yusupova@example.com',
  avatarInitial: 'M',
  joinedAt: '2026-02-10',
};

const STATS: StudentStat[] = [
  { id: 'courses', label: 'Faol kurslar', value: '3' },
  { id: 'completed', label: 'Yakunlangan darslar', value: '48' },
  { id: 'assignments', label: 'Topshiriq bajarilishi', value: '48/62' },
  { id: 'certificates', label: 'Yutuqlar', value: '1' },
];

const PROGRESS: StudentProgressRing[] = [
  {
    id: 'courses',
    label: 'Kurslar progressi',
    percent: 62,
    helper: '2/3 kurs faol',
  },
  {
    id: 'activity',
    label: 'Faollik darajasi',
    percent: 84,
    helper: 'Soʻnggi 30 kun',
  },
  {
    id: 'assignments',
    label: 'Topshiriqlar',
    percent: 77,
    helper: '48/62 bajarildi',
  },
];

const COURSES: EnrolledCourse[] = [
  {
    slug: 'kesish-va-tikish-asoslari',
    title: 'Kesish va tikish asoslari',
    category: 'Asoslar',
    coverColor: '#B5462F',
    progressPercent: 65,
    completedLessons: 21,
    totalLessons: 32,
    nextLesson: 'Andoza chizish asoslari',
  },
  {
    slug: 'ayollar-koylagi-dizayni',
    title: 'Ayollar koʻylagi dizayni',
    category: 'Ayollar kiyimi',
    coverColor: '#7A2E3B',
    progressPercent: 30,
    completedLessons: 12,
    totalLessons: 40,
    nextLesson: 'Yengsiz koʻylak konstruksiyasi',
  },
  {
    slug: 'moda-dizayni-va-eskiz-chizish',
    title: 'Moda dizayni va eskiz chizish',
    category: 'Dizayn',
    coverColor: '#6B3A5C',
    progressPercent: 100,
    completedLessons: 20,
    totalLessons: 20,
    nextLesson: 'Kurs yakunlangan',
  },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Yangi dars qoʻshildi',
    message: '"Ayollar koʻylagi dizayni" kursiga yangi video dars yuklandi.',
    time: '2 soat oldin',
    read: false,
  },
  {
    id: '2',
    title: 'Topshiriq tekshirildi',
    message:
      'Ustoz "Andoza chizish asoslari" topshirigʻingizni baholadi: 96/100.',
    time: 'Kecha',
    read: false,
  },
  {
    id: '3',
    title: 'Sertifikat tayyor',
    message:
      '"Moda dizayni va eskiz chizish" kursi sertifikati yuklab olishga tayyor.',
    time: '3 kun oldin',
    read: true,
  },
  {
    id: '4',
    title: 'Yopiq guruh eslatmasi',
    message: 'Bugun soat 19:00 da jonli savol-javob sessiyasi boʻladi.',
    time: '5 kun oldin',
    read: true,
  },
];

const RESULTS: CourseResult[] = [
  {
    courseTitle: 'Kesish va tikish asoslari',
    rows: [
      { module: 'Kirish', score: 96, maxScore: 100 },
      { module: 'Asosiy vositalar va oʻlchov olish', score: 88, maxScore: 100 },
      { module: 'Andoza tayyorlash', score: 91, maxScore: 100 },
    ],
  },
  {
    courseTitle: 'Ayollar koʻylagi dizayni',
    rows: [
      { module: 'Kirish', score: 84, maxScore: 100 },
      { module: 'Konstruksiya asoslari', score: 79, maxScore: 100 },
    ],
  },
  {
    courseTitle: 'Moda dizayni va eskiz chizish',
    rows: [
      { module: 'Kirish', score: 100, maxScore: 100 },
      { module: 'Eskiz texnikalari', score: 95, maxScore: 100 },
      { module: 'Yakuniy loyiha', score: 98, maxScore: 100 },
    ],
  },
];

const SCHEDULE: ScheduleItem[] = [
  {
    day: 'Dushanba',
    time: '10:00',
    courseTitle: 'Kesish va tikish asoslari',
    topic: 'Andoza chizish asoslari',
  },
  {
    day: 'Chorshanba',
    time: '14:00',
    courseTitle: 'Ayollar koʻylagi dizayni',
    topic: 'Yengsiz koʻylak konstruksiyasi',
  },
  {
    day: 'Payshanba',
    time: '19:00',
    courseTitle: 'Yopiq guruh',
    topic: 'Jonli savol-javob sessiyasi',
  },
  {
    day: 'Shanba',
    time: '11:00',
    courseTitle: 'Kesish va tikish asoslari',
    topic: 'Amaliyot: birinchi buyum',
  },
];

type EnrollmentWithCourse = EnrollmentModel & {
  course: { slug: string; title: string; category: string; coverColor: string };
};
type UserWithRelations = UserModel & {
  enrollments: EnrollmentWithCourse[];
  notifications: NotificationModel[];
};

function toEnrolledCourse(e: EnrollmentWithCourse): EnrolledCourse {
  return {
    slug: e.course.slug,
    title: e.course.title,
    category: e.course.category,
    coverColor: e.course.coverColor,
    progressPercent: e.progressPercent,
    completedLessons: e.completedLessons,
    totalLessons: e.totalLessons,
    nextLesson: e.nextLesson,
  };
}

function toNotification(row: NotificationModel): NotificationItem {
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    time: row.time,
    read: row.read,
  };
}

function toScheduleItem(row: ScheduleItemModel): ScheduleItem {
  return {
    day: row.day,
    time: row.time,
    courseTitle: row.courseTitle,
    topic: row.topic,
  };
}

function computeStats(enrollments: EnrollmentWithCourse[]): StudentStat[] {
  const completedLessons = enrollments.reduce(
    (s, e) => s + e.completedLessons,
    0,
  );
  const totalLessons = enrollments.reduce((s, e) => s + e.totalLessons, 0);
  const certificates = enrollments.filter(
    (e) => e.progressPercent === 100,
  ).length;

  return [
    { id: 'courses', label: 'Faol kurslar', value: String(enrollments.length) },
    {
      id: 'completed',
      label: 'Yakunlangan darslar',
      value: String(completedLessons),
    },
    {
      id: 'assignments',
      label: 'Topshiriq bajarilishi',
      value: `${completedLessons}/${totalLessons}`,
    },
    { id: 'certificates', label: 'Yutuqlar', value: String(certificates) },
  ];
}

function computeProgress(
  enrollments: EnrollmentWithCourse[],
): StudentProgressRing[] {
  if (enrollments.length === 0) return PROGRESS;

  const completedLessons = enrollments.reduce(
    (s, e) => s + e.completedLessons,
    0,
  );
  const totalLessons = enrollments.reduce((s, e) => s + e.totalLessons, 0);
  const avgProgress = Math.round(
    enrollments.reduce((s, e) => s + e.progressPercent, 0) / enrollments.length,
  );
  const activeCount = enrollments.filter((e) => e.progressPercent < 100).length;
  const assignmentsPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return [
    {
      id: 'courses',
      label: 'Kurslar progressi',
      percent: avgProgress,
      helper: `${activeCount}/${enrollments.length} kurs faol`,
    },
    {
      id: 'activity',
      label: 'Faollik darajasi',
      percent: avgProgress,
      helper: 'Soʻnggi 30 kun',
    },
    {
      id: 'assignments',
      label: 'Topshiriqlar',
      percent: assignmentsPercent,
      helper: `${completedLessons}/${totalLessons} bajarildi`,
    },
  ];
}

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(private readonly prisma: PrismaService) {}

  private async getUser(userId: string): Promise<UserWithRelations | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          include: {
            course: {
              select: {
                slug: true,
                title: true,
                category: true,
                coverColor: true,
              },
            },
          },
        },
        notifications: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async getOverview(userId: string): Promise<{
    profile: StudentProfile;
    stats: StudentStat[];
    progress: StudentProgressRing[];
  }> {
    try {
      const user = await this.getUser(userId);
      if (user) {
        return {
          profile: {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email ?? '',
            avatarInitial: user.avatarInitial,
            joinedAt: user.joinedAt.toISOString(),
          },
          stats: computeStats(user.enrollments),
          progress: computeProgress(user.enrollments),
        };
      }
    } catch (error) {
      this.logger.warn(
        `getOverview() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return { profile: PROFILE, stats: STATS, progress: PROGRESS };
  }

  async getCourses(userId: string): Promise<EnrolledCourse[]> {
    try {
      const user = await this.getUser(userId);
      if (user) return user.enrollments.map(toEnrolledCourse);
    } catch (error) {
      this.logger.warn(
        `getCourses() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return COURSES;
  }

  async getNotifications(userId: string): Promise<NotificationItem[]> {
    try {
      const user = await this.getUser(userId);
      if (user) return user.notifications.map(toNotification);
    } catch (error) {
      this.logger.warn(
        `getNotifications() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return NOTIFICATIONS;
  }

  async getResults(userId: string): Promise<CourseResult[]> {
    try {
      const user = await this.getUser(userId);
      if (user) {
        return user.enrollments.map((e) => ({
          courseTitle: e.course.title,
          rows: e.results as unknown as ResultRow[],
        }));
      }
    } catch (error) {
      this.logger.warn(
        `getResults() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return RESULTS;
  }

  async getSchedule(): Promise<ScheduleItem[]> {
    try {
      const rows = await this.prisma.scheduleItem.findMany();
      if (rows.length > 0) return rows.map(toScheduleItem);
    } catch (error) {
      this.logger.warn(
        `getSchedule() falling back to demo data: ${(error as Error).message}`,
      );
    }
    return SCHEDULE;
  }
}
