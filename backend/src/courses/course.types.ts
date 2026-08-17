export type CourseLevel = 'Boshlangʻich' | 'Oʻrta' | 'Pro';

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
