import {
  AdminAccount,
  AdminBlogPost,
  AdminCompletion,
  AdminContactMessage,
  AdminLead,
  AdminOrder,
  AdminOverview,
  AdminStudentPayment,
  AdminTestimonial,
  AdminUser,
  BlogPost,
  Course,
  CourseResult,
  CourseWithDetail,
  EnrolledCourse,
  Founder,
  LiveSession,
  NotificationItem,
  RewardStatus,
  ScheduleItem,
  Stat,
  StudentOverview,
  Testimonial,
} from "./types";
import {
  DEMO_BLOG_POSTS,
  DEMO_COURSES,
  DEMO_ENROLLED_COURSES,
  DEMO_FOUNDER,
  DEMO_NOTIFICATIONS,
  DEMO_RESULTS,
  DEMO_REWARDS,
  DEMO_SCHEDULE,
  DEMO_STATS,
  DEMO_STUDENT,
  DEMO_TESTIMONIALS,
} from "./demo-data";
import { buildCourseDetail } from "./course-detail";
import { getAuthHeaders } from "./session";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100/api";

async function safeGet<T>(
  path: string,
  fallback: T,
  init: RequestInit & { next?: { revalidate?: number } } = { next: { revalidate: 60 } },
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, init);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const getCourses = () => safeGet<Course[]>("/courses", DEMO_COURSES);
export const getStats = () => safeGet<Stat[]>("/stats", DEMO_STATS);
export const getFounder = () => safeGet<Founder>("/founder", DEMO_FOUNDER);
export const getTestimonials = () =>
  safeGet<Testimonial[]>("/testimonials", DEMO_TESTIMONIALS);

export async function getCourseBySlug(
  slug: string,
): Promise<CourseWithDetail | null> {
  try {
    const res = await fetch(`${API_URL}/courses/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("bad response");
    return (await res.json()) as CourseWithDetail;
  } catch {
    const course = DEMO_COURSES.find((c) => c.slug === slug);
    return course ? { ...course, detail: buildCourseDetail(course) } : null;
  }
}

async function authedGet<T>(path: string, fallback: T): Promise<T> {
  const headers = await getAuthHeaders();
  return safeGet<T>(path, fallback, { cache: "no-store", headers });
}

export const getStudentOverview = () =>
  authedGet<StudentOverview>("/me", DEMO_STUDENT);
export const getEnrolledCourses = () =>
  authedGet<EnrolledCourse[]>("/me/courses", DEMO_ENROLLED_COURSES);
export const getNotifications = () =>
  authedGet<NotificationItem[]>("/me/notifications", DEMO_NOTIFICATIONS);
export const getResults = () =>
  authedGet<CourseResult[]>("/me/results", DEMO_RESULTS);
export const getRewards = () =>
  authedGet<RewardStatus>("/me/rewards", DEMO_REWARDS);
export const getSchedule = () =>
  safeGet<ScheduleItem[]>("/me/schedule", DEMO_SCHEDULE, {
    cache: "no-store",
  });
export const getCurrentLiveSession = () =>
  authedGet<LiveSession | null>("/live/current", null);

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
}

const DEMO_PAYMENT_INFO: PaymentInfo = {
  cardNumber: "",
  cardHolder: "",
  cardExpiry: "",
};

export const getPaymentInfo = () =>
  safeGet<PaymentInfo>("/payment-info", DEMO_PAYMENT_INFO, {
    next: { revalidate: 3600 },
  });

export const getBlogPosts = () => safeGet<BlogPost[]>("/blog", DEMO_BLOG_POSTS);

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("bad response");
    return (await res.json()) as BlogPost;
  } catch {
    return DEMO_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

async function adminGet<T>(path: string): Promise<T | null> {
  const headers = await getAuthHeaders();
  try {
    const res = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
      headers,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const getAdminCourses = () =>
  safeGet<Course[]>("/courses", [], { cache: "no-store" });

export const getAdminOverview = () => adminGet<AdminOverview>("/admin/overview");
export const getAdminUsers = () => adminGet<AdminUser[]>("/admin/users");
export const getAdminOrders = () => adminGet<AdminOrder[]>("/orders");
export const getAdminLeads = () => adminGet<AdminLead[]>("/leads");
export const getAdminMessages = () => adminGet<AdminContactMessage[]>("/contact");
export const getAdminTestimonials = () =>
  adminGet<AdminTestimonial[]>("/testimonials/all");
export const getAdminBlogPosts = () => adminGet<AdminBlogPost[]>("/blog/all");
export const getAdminLiveSessions = () => adminGet<LiveSession[]>("/live");
export const getAdminAdmins = () => adminGet<AdminAccount[]>("/admin/admins");
export const getAdminCompletions = () =>
  adminGet<AdminCompletion[]>("/admin/completions");
export const getAdminPayments = () =>
  adminGet<AdminStudentPayment[]>("/admin/payments");
