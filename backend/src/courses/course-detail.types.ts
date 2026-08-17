export interface CourseOutcome {
  key: 'skills' | 'projects' | 'certificate' | 'career';
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
