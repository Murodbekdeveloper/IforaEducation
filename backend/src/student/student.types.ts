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
