import { Course } from './course.types';
import { CourseDetail } from './course-detail.types';

export function buildCourseDetail(course: Course): CourseDetail {
  const categoryLower = course.category.toLowerCase();

  return {
    heroTagline: `${course.category} yoʻnalishi · ${course.level} daraja`,

    outcomes: [
      {
        key: 'skills',
        title: 'Bilim va koʻnikmalar',
        description: `${course.title} boʻyicha nazariy va amaliy bilimlarga toʻliq ega boʻlasiz.`,
      },
      {
        key: 'projects',
        title: 'Amaliy loyihalar',
        description: `${course.lessonsCount} ta darsda real buyumlar ustida qoʻlma-qoʻl ishlaysiz.`,
      },
      {
        key: 'certificate',
        title: 'Sertifikat',
        description:
          'Kursni yakunlab, akademiyaning rasmiy sertifikatini qoʻlga kiritasiz.',
      },
      {
        key: 'career',
        title: 'Kasb boshlash',
        description:
          'Mustaqil tikuvchi sifatida ishlash yoki oʻz atelye ochish uchun tayyor boʻlasiz.',
      },
    ],

    about: {
      title: `${categoryLower} yoʻnalishida mutaxassis nima qila oladi?`,
      description: `Ushbu yoʻnalishni yakunlagan mutaxassis ${categoryLower} sohasida mustaqil buyurtmalar qabul qiladi, oʻz andozalarini yaratadi va sifatli, tugal tikuv ishlarini bajaradi. Bozorda talab yuqori boʻlgan koʻnikmalarga ega boʻlasiz.`,
    },

    format: [
      {
        title: 'Darslar',
        description:
          'Video darslar orqali nazariy va amaliy bilimlarni bosqichma-bosqich oʻrganasiz.',
      },
      {
        title: 'Amaliyot',
        description:
          'Har bir mavzudan keyin mustaqil ravishda mashq va topshiriqlar bajarasiz.',
      },
      {
        title: 'Nazorat',
        description:
          'Ustoz ishlaringizni tekshirib, shaxsiy fikr-mulohaza va tavsiyalar beradi.',
      },
      {
        title: 'Sertifikat',
        description:
          'Yakuniy loyihani muvaffaqiyatli topshirib, sertifikat qoʻlga kiritasiz.',
      },
    ],

    audience: [
      {
        index: '01',
        title: 'Tikuvchilikni noldan oʻrganmoqchi boʻlganlar',
        description:
          'Hech qanday tajribasi boʻlmasa ham, noldan boshlab bosqichma-bosqich oʻrganadi.',
      },
      {
        index: '02',
        title: `${course.category} sohasida ishlayotganlar`,
        description:
          'Mavjud bilimlarini chuqurlashtirib, mutaxassislik darajasiga koʻtaradi.',
      },
      {
        index: '03',
        title: 'Oʻz atelyesini ochmoqchi boʻlganlar',
        description:
          'Mustaqil biznes boshlash uchun barcha zarur koʻnikmalarni egallaydi.',
      },
    ],

    curriculum: [
      {
        title: 'Kirish',
        lessons: [
          { title: 'Kurs bilan tanishish', duration: '00:05:00' },
          { title: 'Kerakli vositalar va materiallar', duration: '00:10:00' },
          { title: 'Yopiq guruhga qoʻshilish', duration: '00:05:00' },
          { title: 'Qanday oʻqish kerak?', duration: '00:15:00' },
        ],
      },
      {
        title: 'Asosiy vositalar va oʻlchov olish',
        lessons: [
          { title: 'Tikuv mashinasi bilan ishlash', duration: '00:20:00' },
          { title: 'Toʻgʻri oʻlchov olish', duration: '00:15:00' },
        ],
      },
      {
        title: 'Andoza tayyorlash',
        lessons: [
          { title: 'Andoza chizish asoslari', duration: '00:25:00' },
          { title: 'Matoni kesish texnikasi', duration: '00:20:00' },
        ],
      },
      {
        title: 'Tikish texnikalari',
        lessons: [
          { title: 'Asosiy choklar', duration: '00:30:00' },
          { title: 'Bezak elementlari', duration: '00:20:00' },
        ],
      },
      {
        title: 'Yakuniy loyiha va sertifikatlash',
        lessons: [
          { title: 'Yakuniy buyumni tikish', duration: '00:40:00' },
          { title: 'Loyihani topshirish', duration: '00:10:00' },
        ],
      },
    ],

    projects: [
      {
        title: `Birinchi ${categoryLower} buyumi`,
        description:
          'Kursning boshida oʻrgangan bilimlaringiz asosida birinchi mustaqil buyumingizni tikasiz.',
      },
      {
        title: 'Amaliy toʻplam',
        description:
          'Turli texnikalarni birlashtirgan holda toʻliq bir toʻplam (kolleksiya) ustida ishlaysiz.',
      },
      {
        title: 'Mustaqil buyurtma',
        description:
          'Real mijoz stsenariysi asosida oʻlchovdan tayyor mahsulotgacha boʻlgan yoʻlni bosib oʻtasiz.',
      },
    ],

    skills: [
      `${course.category} yoʻnalishida mustaqil ishlash`,
      'Toʻgʻri oʻlchov olish va andoza tayyorlash',
      'Tikuv mashinasi va qoʻshimcha asboblarda ishlash',
      'Matoni tanlash va toʻgʻri kesish',
      'Sifatli va tugal choklar bilan ishlash',
    ],

    tools: [
      'Tikuv mashinasi',
      'Overlok',
      'Andoza qogʻozi',
      'Oʻlchov lentasi',
      'Qaychi va ignalar',
    ],

    instructor: {
      name: 'Ifora Isaqova',
      role: `${course.title} kursi muallifi`,
      bio: '15 yildan ortiq tajribaga ega tikuvchilik ustasi. Minglab shogirdlarni mustaqil kasb egasiga aylantirgan.',
    },

    pricing: {
      periodLabel: `${course.durationMonths} OYLIK KURS`,
      note: `Kursda ishlashingiz uchun ${course.durationMonths} oy muddat beriladi.`,
      included: [
        `${course.durationMonths} oy amaliy mashgʻulot`,
        'Video darslar',
        'Testlar va nazorat ishlari',
        'Individual mentorlik',
        'Yakuniy sertifikat',
      ],
    },

    faq: [
      {
        question: 'Kursni boshlash uchun qanday tajribaga ega boʻlish kerak?',
        answer:
          'Hech qanday oldindan tajriba talab qilinmaydi — kurs noldan boshlaydiganlar uchun ham moslashtirilgan.',
      },
      {
        question: 'Kursni tugatgach mustaqil ishlay olamanmi?',
        answer:
          'Ha, kurs davomida bajarilgan amaliy loyihalar sizni mustaqil buyurtmalar qabul qilishga tayyorlaydi.',
      },
      {
        question: 'Qanday asbob-uskunalar kerak boʻladi?',
        answer:
          'Oddiy tikuv mashinasi, qaychi, igna-ip va oʻlchov lentasi yetarli. Toʻliq roʻyxat birinchi darsda beriladi.',
      },
      {
        question: 'Kurs qancha vaqt davom etadi?',
        answer: `Kurs ${course.durationMonths} oy davom etadi va ${course.lessonsCount} ta darsdan iborat.`,
      },
      {
        question: 'Darslarni istalgan vaqtda koʻrish mumkinmi?',
        answer:
          'Ha, barcha video darslar shaxsiy kabinetingizda istalgan vaqtda mavjud boʻladi.',
      },
      {
        question: 'Kursda mentor yordami bormi?',
        answer:
          'Ha, yopiq guruhda ustozlar va mentorlar savollaringizga javob berib boradi.',
      },
    ],
  };
}
