export type CourseLevel = "Boshlangʻich" | "Oʻrta" | "Pro";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: CourseLevel;
  durationMonths: number;
  lessonsCount: number;
  studentsCount: number;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  coverColor: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface Founder {
  name: string;
  role: string;
  experienceYears: number;
  studentsGraduated: number;
  bio: string;
  quote: string;
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  text: string;
}

export interface CourseOutcome {
  key: "skills" | "projects" | "certificate" | "career";
  title: string;
  description: string;
}

export interface CourseFormatStep {
  title: string;
  description: string;
}

export interface CourseAudienceSegment {
  index: string;
  title: string;
  description: string;
}

export interface CourseLesson {
  title: string;
  duration?: string;
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface CourseProject {
  title: string;
  description: string;
}

export interface CourseInstructor {
  name: string;
  role: string;
  bio: string;
}

export interface CoursePricing {
  periodLabel: string;
  note: string;
  included: string[];
}

export interface CourseFaqItem {
  question: string;
  answer: string;
}

export interface CourseDetail {
  heroTagline: string;
  outcomes: CourseOutcome[];
  about: { title: string; description: string };
  format: CourseFormatStep[];
  audience: CourseAudienceSegment[];
  curriculum: CourseModule[];
  projects: CourseProject[];
  skills: string[];
  tools: string[];
  instructor: CourseInstructor;
  pricing: CoursePricing;
  faq: CourseFaqItem[];
}

export interface CourseWithDetail extends Course {
  detail: CourseDetail;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatarInitial: string;
  joinedAt: string;
}

export interface StudentStat {
  id: string;
  label: string;
  value: string;
}

export interface StudentProgressRing {
  id: string;
  label: string;
  percent: number;
  helper: string;
}

export interface StudentOverview {
  profile: StudentProfile;
  stats: StudentStat[];
  progress: StudentProgressRing[];
}

export interface EnrolledCourse {
  slug: string;
  title: string;
  category: string;
  coverColor: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  nextLesson: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ResultRow {
  module: string;
  score: number;
  maxScore: number;
}

export interface CourseResult {
  courseTitle: string;
  rows: ResultRow[];
}

export interface ScheduleItem {
  day: string;
  time: string;
  courseTitle: string;
  topic: string;
}

export interface RewardTier {
  key: string;
  title: string;
  threshold: number;
  discountPercent: number;
  perk: string;
}

export interface RewardTierStatus extends RewardTier {
  unlocked: boolean;
}

export interface RewardStatus {
  totalPoints: number;
  discountPercent: number;
  currentTierTitle: string | null;
  nextTier: RewardTierStatus | null;
  pointsToNext: number | null;
  tiers: RewardTierStatus[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverColor: string;
  publishedAt: string;
}

export type UserRole = "STUDENT" | "ADMIN";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  avatarInitial: string;
  role: UserRole;
}

export interface AdminOverview {
  studentsCount: number;
  adminsCount: number;
  ordersConfirmed: number;
  ordersPending: number;
  revenueTotal: number;
  leadsUncontacted: number;
  messagesUnread: number;
  testimonialsPending: number;
  coursesCount: number;
  liveSessionsLive: number;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  avatarInitial: string;
  joinedAt: string;
  enrollmentsCount: number;
  ordersCount: number;
}

export interface AdminUserEnrollment {
  id: string;
  courseTitle: string;
  courseSlug: string;
  coverColor: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  nextLesson: string;
  completedAt: string | null;
}

export interface AdminUserOrder {
  id: string;
  courseTitle: string;
  courseSlug: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface AdminUserDetail {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  avatarInitial: string;
  joinedAt: string;
  role: UserRole;
  hasPassword: boolean;
  enrollments: AdminUserEnrollment[];
  orders: AdminUserOrder[];
}

export interface AdminPaymentCourse {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  coursePrice: number;
  paidAmount: number;
  paidPercent: number;
  ordersCount: number;
  lastPaymentAt: string | null;
  nextDueAt: string | null;
  completed: boolean;
  dueSoon: boolean;
  overdue: boolean;
}

export interface AdminStudentPayment {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  avatarInitial: string;
  totalPaid: number;
  hasDueSoon: boolean;
  hasCompleted: boolean;
  courses: AdminPaymentCourse[];
  orders: AdminUserOrder[];
}

export interface AdminAccount {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  avatarInitial: string;
  joinedAt: string;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface AdminOrder {
  id: string;
  fullName: string;
  phone: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  courseTitle: string;
  courseSlug: string;
}

export interface AdminCompletion {
  id: string;
  completedAt: string;
}

export interface AdminLead {
  id: string;
  phone: string;
  telegramUsername?: string;
  courseSlug?: string;
  contacted: boolean;
  createdAt: string;
}

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminTestimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  text: string;
  approved: boolean;
}

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverColor: string;
  publishedAt: string;
}

export type LiveSessionStatus = "SCHEDULED" | "LIVE" | "ENDED";

export interface LiveSession {
  id: string;
  title: string;
  description: string | null;
  youtubeVideoId: string | null;
  status: LiveSessionStatus;
  scheduledAt: string;
  startedAt: string | null;
  endedAt: string | null;
}

export interface LiveChatMessage {
  id: string;
  message: string;
  createdAt: string;
  userId: string;
  authorName: string;
  authorInitial: string;
}

export type SpeakRequestStatus = "PENDING" | "APPROVED" | "DENIED";

export interface LiveSpeakRequest {
  id: string;
  status: SpeakRequestStatus;
  createdAt: string;
  resolvedAt: string | null;
  userId: string;
  authorName: string;
  authorInitial: string;
  authorPhone: string;
}
