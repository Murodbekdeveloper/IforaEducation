import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? '',
});
const prisma = new PrismaClient({ adapter });

const DEMO_PASSWORD = 'parol123';

const ADMIN_USER = {
  firstName: 'Ifora',
  lastName: 'Isaqova',
  phone: '+998901112233',
  email: 'admin@ifora.uz',
  avatarInitial: 'I',
};
const ADMIN_PASSWORD = 'admin12345';

const COURSES = [
  {
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
    oldPrice: null,
    rating: 4.8,
    badge: 'Yangi',
    coverColor: '#7A2E3B',
  },
  {
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
    oldPrice: null,
    rating: 4.7,
    badge: null,
    coverColor: '#2B2320',
  },
  {
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
    oldPrice: null,
    rating: 4.8,
    badge: null,
    coverColor: '#A63D40',
  },
  {
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
    oldPrice: null,
    rating: 4.9,
    badge: 'Ustoz tanlovi',
    coverColor: '#8C5A2B',
  },
  {
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
    oldPrice: null,
    rating: 4.6,
    badge: null,
    coverColor: '#4A5043',
  },
  {
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
    oldPrice: null,
    rating: 4.7,
    badge: 'Yangi',
    coverColor: '#6B3A5C',
  },
];

const FOUNDER = {
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

const TESTIMONIALS = [
  {
    name: 'Nilufar Rashidova',
    course: 'Kesish va tikish asoslari',
    rating: 5,
    text: 'Uch oy ichida noldan boshlab oʻzim uchun koʻylak tika oladigan boʻldim. Ustozlar juda sabrli va tushunarli tushuntirishadi.',
  },
  {
    name: 'Madina Yoʻldosheva',
    course: 'Kelin koʻylagi va kechki liboslar',
    rating: 5,
    text: 'Kursdan keyin oʻz atelyemni ochdim. Ifora opaning darslari haqiqiy amaliy tajribaga asoslangan, bu eng katta afzalligi.',
  },
  {
    name: 'Sevinch Qodirova',
    course: 'Moda dizayni va eskiz chizish',
    rating: 4.8,
    text: 'Eskiz chizishdan tortib tayyor mahsulotgacha boʻlgan yoʻlni toʻliq tushundim. Endi oʻz kolleksiyam ustida ishlayapman.',
  },
  {
    name: 'Gulnoza Tursunova',
    course: 'Milliy liboslar va zardoʻzlik',
    rating: 5,
    text: 'Zardoʻzlik texnikalarini shunchalik chuqur oʻrgatishdiki, hozir buyurtmalar bilan bandman. Rahmat platformaga!',
  },
];

const PLATFORM_STATS = [
  { key: 'students', label: 'Talaba', value: 12400, suffix: '+' },
  { key: 'mentors', label: 'Tajribali ustozlar', value: 25, suffix: '+' },
  { key: 'courses', label: 'Kurs yoʻnalishi', value: 40, suffix: '+' },
  {
    key: 'satisfaction',
    label: 'Mamnun bitiruvchilar',
    value: 98,
    suffix: '%',
  },
];

const SCHEDULE = [
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

const DEMO_STUDENT = {
  firstName: 'Mohira',
  lastName: 'Yusupova',
  phone: '+998901234567',
  email: 'mohira.yusupova@example.com',
  avatarInitial: 'M',
};

const BLOG_POSTS = [
  {
    slug: 'tikuvchilikni-qayerdan-boshlash-kerak',
    title: 'Tikuvchilikni qayerdan boshlash kerak?',
    excerpt:
      'Noldan tikuvchilikni oʻrganmoqchi boʻlganlar uchun birinchi qadamlar: kerakli asboblar va mashq tartibi.',
    content:
      'Tikuvchilikni oʻrganish uchun eng avvalo oddiy tikuv mashinasi, qaychi va oʻlchov lentasi kifoya. Birinchi haftalarda toʻgʻri chiziq boʻylab tikishni, keyin esa oddiy andozalar bilan ishlashni mashq qiling. Sabr va muntazam mashq — muvaffaqiyat kaliti.',
    coverColor: '#B5462F',
    publishedAt: new Date('2026-06-01'),
  },
  {
    slug: 'togri-olchov-olish-sirlari',
    title: 'Toʻgʻri oʻlchov olish sirlari',
    excerpt:
      'Har qanday buyum sifatli chiqishi uchun eng muhim bosqich — toʻgʻri oʻlchov olish. Asosiy nuqtalarni bilib oling.',
    content:
      'Oʻlchov olishda tana holati tik boʻlishi, lenta esa juda qattiq yoki boʻsh boʻlmasligi kerak. Ko‘krak, bel va son aylanalarini, shuningdek yengsiz uzunlikni toʻgʻri oʻlchash kelajakdagi barcha andozalar uchun asos boʻladi.',
    coverColor: '#7A2E3B',
    publishedAt: new Date('2026-06-08'),
  },
  {
    slug: 'ozini-tikuvchi-sifatida-qanday-rivojlantirish',
    title: 'Oʻzini tikuvchi sifatida qanday rivojlantirish mumkin?',
    excerpt:
      'Kursni tugatgach ham oʻsishni davom ettirish uchun amaliy maslahatlar va mashq rejasi.',
    content:
      'Doimiy amaliyot, yangi texnikalarni oʻrganish va real buyurtmalar bilan ishlash — professional darajaga koʻtarilishning eng tez yoʻli. Har oyda kamida bitta yangi buyum tikishga harakat qiling.',
    coverColor: '#6B3A5C',
    publishedAt: new Date('2026-06-15'),
  },
];

const DEMO_ENROLLMENTS = [
  {
    courseSlug: 'kesish-va-tikish-asoslari',
    progressPercent: 65,
    completedLessons: 21,
    totalLessons: 32,
    nextLesson: 'Andoza chizish asoslari',
    results: [
      { module: 'Kirish', score: 96, maxScore: 100 },
      { module: 'Asosiy vositalar va oʻlchov olish', score: 88, maxScore: 100 },
      { module: 'Andoza tayyorlash', score: 91, maxScore: 100 },
    ],
  },
  {
    courseSlug: 'ayollar-koylagi-dizayni',
    progressPercent: 30,
    completedLessons: 12,
    totalLessons: 40,
    nextLesson: 'Yengsiz koʻylak konstruksiyasi',
    results: [
      { module: 'Kirish', score: 84, maxScore: 100 },
      { module: 'Konstruksiya asoslari', score: 79, maxScore: 100 },
    ],
  },
  {
    courseSlug: 'moda-dizayni-va-eskiz-chizish',
    progressPercent: 100,
    completedLessons: 20,
    totalLessons: 20,
    nextLesson: 'Kurs yakunlangan',
    results: [
      { module: 'Kirish', score: 100, maxScore: 100 },
      { module: 'Eskiz texnikalari', score: 95, maxScore: 100 },
      { module: 'Yakuniy loyiha', score: 98, maxScore: 100 },
    ],
  },
];

const DEMO_NOTIFICATIONS = [
  {
    title: 'Yangi dars qoʻshildi',
    message: '"Ayollar koʻylagi dizayni" kursiga yangi video dars yuklandi.',
    time: '2 soat oldin',
    read: false,
  },
  {
    title: 'Topshiriq tekshirildi',
    message:
      'Ustoz "Andoza chizish asoslari" topshirigʻingizni baholadi: 96/100.',
    time: 'Kecha',
    read: false,
  },
  {
    title: 'Sertifikat tayyor',
    message:
      '"Moda dizayni va eskiz chizish" kursi sertifikati yuklab olishga tayyor.',
    time: '3 kun oldin',
    read: true,
  },
  {
    title: 'Yopiq guruh eslatmasi',
    message: 'Bugun soat 19:00 da jonli savol-javob sessiyasi boʻladi.',
    time: '5 kun oldin',
    read: true,
  },
];

async function main() {
  console.log('Seeding courses...');
  for (const course of COURSES) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }

  console.log('Seeding founder...');
  const existingFounder = await prisma.founder.findFirst();
  if (!existingFounder) {
    await prisma.founder.create({ data: FOUNDER });
  }

  console.log('Seeding testimonials...');
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({ data: TESTIMONIALS });
  }

  console.log('Seeding platform stats...');
  for (const stat of PLATFORM_STATS) {
    await prisma.platformStat.upsert({
      where: { key: stat.key },
      update: stat,
      create: stat,
    });
  }

  console.log('Seeding schedule...');
  const existingSchedule = await prisma.scheduleItem.count();
  if (existingSchedule === 0) {
    await prisma.scheduleItem.createMany({ data: SCHEDULE });
  }

  console.log('Seeding demo student...');
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const student = await prisma.user.upsert({
    where: { phone: DEMO_STUDENT.phone },
    update: { ...DEMO_STUDENT, passwordHash },
    create: {
      ...DEMO_STUDENT,
      passwordHash,
      joinedAt: new Date('2026-02-10'),
    },
  });

  for (const enrollment of DEMO_ENROLLMENTS) {
    const course = await prisma.course.findUnique({
      where: { slug: enrollment.courseSlug },
    });
    if (!course) continue;

    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: student.id, courseId: course.id } },
      update: {
        progressPercent: enrollment.progressPercent,
        completedLessons: enrollment.completedLessons,
        totalLessons: enrollment.totalLessons,
        nextLesson: enrollment.nextLesson,
        results: enrollment.results,
      },
      create: {
        userId: student.id,
        courseId: course.id,
        progressPercent: enrollment.progressPercent,
        completedLessons: enrollment.completedLessons,
        totalLessons: enrollment.totalLessons,
        nextLesson: enrollment.nextLesson,
        results: enrollment.results,
      },
    });
  }

  const existingNotifications = await prisma.notification.count({
    where: { userId: student.id },
  });
  if (existingNotifications === 0) {
    await prisma.notification.createMany({
      data: DEMO_NOTIFICATIONS.map((n) => ({ ...n, userId: student.id })),
    });
  }

  console.log('Seeding blog posts...');
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('Seeding admin account...');
  const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { phone: ADMIN_USER.phone },
    update: { ...ADMIN_USER, passwordHash: adminPasswordHash, role: 'ADMIN' },
    create: {
      ...ADMIN_USER,
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      joinedAt: new Date('2026-01-01'),
    },
  });

  console.log('Seed complete.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
