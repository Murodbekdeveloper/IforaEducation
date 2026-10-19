import {
  BlogPost,
  Course,
  CourseResult,
  EnrolledCourse,
  Founder,
  NotificationItem,
  RewardStatus,
  ScheduleItem,
  Stat,
  StudentOverview,
  Testimonial,
} from "./types";
import { buildRewardStatus } from "./reward-tiers";

export const DEMO_COURSES: Course[] = [
  {
    id: "1",
    slug: "kesish-va-tikish-asoslari",
    title: "Kesish va tikish asoslari",
    description:
      "Noldan boshlab tikuvchilik kasbini egallang: o'lchov olish, andoza chizish va birinchi buyumingizni tikish.",
    category: "Asoslar",
    level: "Boshlangʻich",
    durationMonths: 3,
    lessonsCount: 32,
    studentsCount: 4820,
    price: 890000,
    oldPrice: 1290000,
    rating: 4.9,
    badge: "Mashhur",
    coverColor: "#B5462F",
  },
  {
    id: "2",
    slug: "ayollar-koylagi-dizayni",
    title: "Ayollar koʻylagi dizayni",
    description:
      "Zamonaviy va milliy uslubdagi ayollar koʻylaklarini andozadan tayyor mahsulotgacha tikishni oʻrganing.",
    category: "Ayollar kiyimi",
    level: "Oʻrta",
    durationMonths: 4,
    lessonsCount: 40,
    studentsCount: 3210,
    price: 1190000,
    rating: 4.8,
    badge: "Yangi",
    coverColor: "#7A2E3B",
  },
  {
    id: "3",
    slug: "kelin-koylagi-va-kechki-liboslar",
    title: "Kelin koʻylagi va kechki liboslar",
    description:
      "Korset, shleyf va nafis matolar bilan ishlashni, murakkab kelinlik konstruksiyalarini yaratishni chuqur oʻrganing.",
    category: "Pro dizayn",
    level: "Pro",
    durationMonths: 5,
    lessonsCount: 48,
    studentsCount: 1540,
    price: 1690000,
    oldPrice: 2190000,
    rating: 5,
    badge: "Top kurs",
    coverColor: "#C9A227",
  },
  {
    id: "4",
    slug: "erkaklar-kostyumi-tikish",
    title: "Erkaklar kostyumi tikish",
    description:
      "Klassik erkaklar kostyumi, koʻylak va shim tikishning barcha bosqichlarini mutaxassislardan oʻrganing.",
    category: "Erkaklar kiyimi",
    level: "Oʻrta",
    durationMonths: 4,
    lessonsCount: 36,
    studentsCount: 2130,
    price: 1090000,
    rating: 4.7,
    coverColor: "#2B2320",
  },
  {
    id: "5",
    slug: "bolalar-kiyimi-tikish",
    title: "Bolalar kiyimi tikish",
    description:
      "Qulay va xavfsiz matolardan chaqaloq hamda maktabgacha yoshdagi bolalar uchun kiyimlar tikishni oʻrganing.",
    category: "Bolalar kiyimi",
    level: "Boshlangʻich",
    durationMonths: 2,
    lessonsCount: 24,
    studentsCount: 2870,
    price: 690000,
    rating: 4.8,
    coverColor: "#A63D40",
  },
  {
    id: "6",
    slug: "milliy-liboslar-va-zardozlik",
    title: "Milliy liboslar va zardoʻzlik",
    description:
      "Oʻzbek milliy liboslarini an'anaviy zardoʻzlik texnikalari bilan bezash va tikishni mukammal egallang.",
    category: "Milliy liboslar",
    level: "Pro",
    durationMonths: 4,
    lessonsCount: 34,
    studentsCount: 980,
    price: 1290000,
    rating: 4.9,
    badge: "Ustoz tanlovi",
    coverColor: "#8C5A2B",
  },
  {
    id: "7",
    slug: "trikotaj-kiyim-tikish",
    title: "Trikotaj kiyim tikish",
    description:
      "Overlok va trikotaj mashinalarida ishlash, choʻzluvchan matolardan sport va kundalik kiyimlar tikish.",
    category: "Trikotaj",
    level: "Oʻrta",
    durationMonths: 3,
    lessonsCount: 28,
    studentsCount: 1670,
    price: 890000,
    rating: 4.6,
    coverColor: "#4A5043",
  },
  {
    id: "8",
    slug: "moda-dizayni-va-eskiz-chizish",
    title: "Moda dizayni va eskiz chizish",
    description:
      "Oʻz kolleksiyangizni yaratish uchun moda eskizlari chizish, rang va siluet tanlash sirlarini oʻrganing.",
    category: "Dizayn",
    level: "Boshlangʻich",
    durationMonths: 2,
    lessonsCount: 20,
    studentsCount: 2260,
    price: 590000,
    rating: 4.7,
    badge: "Yangi",
    coverColor: "#6B3A5C",
  },
];

export const DEMO_STATS: Stat[] = [
  { id: "students", value: 12400, suffix: "+", label: "Talaba" },
  { id: "mentors", value: 25, suffix: "+", label: "Tajribali ustozlar" },
  { id: "courses", value: 40, suffix: "+", label: "Kurs yoʻnalishi" },
  { id: "satisfaction", value: 98, suffix: "%", label: "Mamnun bitiruvchilar" },
];

export const DEMO_FOUNDER: Founder = {
  name: "Ifora Isaqova",
  role: "Platforma asoschisi, tikuvchilik ustasi",
  experienceYears: 15,
  studentsGraduated: 6000,
  bio: "Ifora Isaqova — 15 yildan ortiq tajribaga ega tikuvchilik ustasi, Oʻzbekistonda bir nechta moda koʻrgazmalari gʻolibi. U oʻz bilim va tajribasini minglab shogirdlariga oʻrgatish maqsadida ushbu platformani asos solgan.",
  quote:
    "Har bir tikilgan choki — bu mehnat va sabr mevasi. Men sizga nafaqat kasb, balki mustaqil hayot yoʻlini oʻrgataman.",
  achievements: [
    "Milliy moda haftaligi gʻolibi, 2019",
    "6000+ shogirdni mustaqil kasb egasiga aylantirgan",
    "Xalqaro tikuvchilik sertifikatlari egasi",
  ],
};

export const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Nilufar Rashidova",
    course: "Kesish va tikish asoslari",
    rating: 5,
    text: "Uch oy ichida noldan boshlab oʻzim uchun koʻylak tika oladigan boʻldim. Ustozlar juda sabrli va tushunarli tushuntirishadi.",
  },
  {
    id: "2",
    name: "Madina Yoʻldosheva",
    course: "Kelin koʻylagi va kechki liboslar",
    rating: 5,
    text: "Kursdan keyin oʻz atelyemni ochdim. Ifora opaning darslari haqiqiy amaliy tajribaga asoslangan, bu eng katta afzalligi.",
  },
  {
    id: "3",
    name: "Sevinch Qodirova",
    course: "Moda dizayni va eskiz chizish",
    rating: 4.8,
    text: "Eskiz chizishdan tortib tayyor mahsulotgacha boʻlgan yoʻlni toʻliq tushundim. Endi oʻz kolleksiyam ustida ishlayapman.",
  },
  {
    id: "4",
    name: "Gulnoza Tursunova",
    course: "Milliy liboslar va zardoʻzlik",
    rating: 5,
    text: "Zardoʻzlik texnikalarini shunchalik chuqur oʻrgatishdiki, hozir buyurtmalar bilan bandman. Rahmat platformaga!",
  },
];

export const DEMO_STUDENT: StudentOverview = {
  profile: {
    firstName: "Mohira",
    lastName: "Yusupova",
    phone: "+998 90 123 45 67",
    email: "mohira.yusupova@example.com",
    avatarInitial: "M",
    joinedAt: "2026-02-10",
  },
  stats: [
    { id: "courses", label: "Faol kurslar", value: "3" },
    { id: "completed", label: "Yakunlangan darslar", value: "48" },
    { id: "assignments", label: "Topshiriq bajarilishi", value: "48/62" },
    { id: "certificates", label: "Yutuqlar", value: "1" },
  ],
  progress: [
    { id: "courses", label: "Kurslar progressi", percent: 62, helper: "2/3 kurs faol" },
    { id: "activity", label: "Faollik darajasi", percent: 84, helper: "Soʻnggi 30 kun" },
    { id: "assignments", label: "Topshiriqlar", percent: 77, helper: "48/62 bajarildi" },
  ],
};

export const DEMO_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    slug: "kesish-va-tikish-asoslari",
    title: "Kesish va tikish asoslari",
    category: "Asoslar",
    coverColor: "#B5462F",
    progressPercent: 65,
    completedLessons: 21,
    totalLessons: 32,
    nextLesson: "Andoza chizish asoslari",
  },
  {
    slug: "ayollar-koylagi-dizayni",
    title: "Ayollar koʻylagi dizayni",
    category: "Ayollar kiyimi",
    coverColor: "#7A2E3B",
    progressPercent: 30,
    completedLessons: 12,
    totalLessons: 40,
    nextLesson: "Yengsiz koʻylak konstruksiyasi",
  },
  {
    slug: "moda-dizayni-va-eskiz-chizish",
    title: "Moda dizayni va eskiz chizish",
    category: "Dizayn",
    coverColor: "#6B3A5C",
    progressPercent: 100,
    completedLessons: 20,
    totalLessons: 20,
    nextLesson: "Kurs yakunlangan",
  },
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Yangi dars qoʻshildi",
    message: '"Ayollar koʻylagi dizayni" kursiga yangi video dars yuklandi.',
    time: "2 soat oldin",
    read: false,
  },
  {
    id: "2",
    title: "Topshiriq tekshirildi",
    message: 'Ustoz "Andoza chizish asoslari" topshirigʻingizni baholadi: 96/100.',
    time: "Kecha",
    read: false,
  },
  {
    id: "3",
    title: "Sertifikat tayyor",
    message: '"Moda dizayni va eskiz chizish" kursi sertifikati yuklab olishga tayyor.',
    time: "3 kun oldin",
    read: true,
  },
  {
    id: "4",
    title: "Yopiq guruh eslatmasi",
    message: "Bugun soat 19:00 da jonli savol-javob sessiyasi boʻladi.",
    time: "5 kun oldin",
    read: true,
  },
];

export const DEMO_RESULTS: CourseResult[] = [
  {
    courseTitle: "Kesish va tikish asoslari",
    rows: [
      { module: "Kirish", score: 96, maxScore: 100 },
      { module: "Asosiy vositalar va oʻlchov olish", score: 88, maxScore: 100 },
      { module: "Andoza tayyorlash", score: 91, maxScore: 100 },
    ],
  },
  {
    courseTitle: "Ayollar koʻylagi dizayni",
    rows: [
      { module: "Kirish", score: 84, maxScore: 100 },
      { module: "Konstruksiya asoslari", score: 79, maxScore: 100 },
    ],
  },
  {
    courseTitle: "Moda dizayni va eskiz chizish",
    rows: [
      { module: "Kirish", score: 100, maxScore: 100 },
      { module: "Eskiz texnikalari", score: 95, maxScore: 100 },
      { module: "Yakuniy loyiha", score: 98, maxScore: 100 },
    ],
  },
];

export const DEMO_REWARDS: RewardStatus = buildRewardStatus(
  DEMO_RESULTS.reduce(
    (sum, course) =>
      sum + course.rows.reduce((rowSum, row) => rowSum + row.score, 0),
    0,
  ),
);

export const DEMO_SCHEDULE: ScheduleItem[] = [
  { day: "Dushanba", time: "10:00", courseTitle: "Kesish va tikish asoslari", topic: "Andoza chizish asoslari" },
  { day: "Chorshanba", time: "14:00", courseTitle: "Ayollar koʻylagi dizayni", topic: "Yengsiz koʻylak konstruksiyasi" },
  { day: "Payshanba", time: "19:00", courseTitle: "Yopiq guruh", topic: "Jonli savol-javob sessiyasi" },
  { day: "Shanba", time: "11:00", courseTitle: "Kesish va tikish asoslari", topic: "Amaliyot: birinchi buyum" },
];

export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    slug: "tikuvchilikni-qayerdan-boshlash-kerak",
    title: "Tikuvchilikni qayerdan boshlash kerak?",
    excerpt:
      "Noldan tikuvchilikni oʻrganmoqchi boʻlganlar uchun birinchi qadamlar: kerakli asboblar va mashq tartibi.",
    content:
      "Tikuvchilikni oʻrganish uchun eng avvalo oddiy tikuv mashinasi, qaychi va oʻlchov lentasi kifoya. Birinchi haftalarda toʻgʻri chiziq boʻylab tikishni, keyin esa oddiy andozalar bilan ishlashni mashq qiling. Sabr va muntazam mashq — muvaffaqiyat kaliti.",
    coverColor: "#B5462F",
    publishedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    slug: "togri-olchov-olish-sirlari",
    title: "Toʻgʻri oʻlchov olish sirlari",
    excerpt:
      "Har qanday buyum sifatli chiqishi uchun eng muhim bosqich — toʻgʻri oʻlchov olish. Asosiy nuqtalarni bilib oling.",
    content:
      "Oʻlchov olishda tana holati tik boʻlishi, lenta esa juda qattiq yoki boʻsh boʻlmasligi kerak. Ko‘krak, bel va son aylanalarini, shuningdek yengsiz uzunlikni toʻgʻri oʻlchash kelajakdagi barcha andozalar uchun asos boʻladi.",
    coverColor: "#7A2E3B",
    publishedAt: "2026-06-08T00:00:00.000Z",
  },
  {
    slug: "ozini-tikuvchi-sifatida-qanday-rivojlantirish",
    title: "Oʻzini tikuvchi sifatida qanday rivojlantirish mumkin?",
    excerpt:
      "Kursni tugatgach ham oʻsishni davom ettirish uchun amaliy maslahatlar va mashq rejasi.",
    content:
      "Doimiy amaliyot, yangi texnikalarni oʻrganish va real buyurtmalar bilan ishlash — professional darajaga koʻtarilishning eng tez yoʻli. Har oyda kamida bitta yangi buyum tikishga harakat qiling.",
    coverColor: "#6B3A5C",
    publishedAt: "2026-06-15T00:00:00.000Z",
  },
];
