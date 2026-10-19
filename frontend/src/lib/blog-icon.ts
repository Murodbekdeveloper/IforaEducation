import {
  BookOpen,
  Compass,
  GraduationCap,
  Lightbulb,
  PenTool,
  Ruler,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const BLOG_ICONS: LucideIcon[] = [
  PenTool,
  Ruler,
  Lightbulb,
  BookOpen,
  Sparkles,
  Scissors,
  Compass,
  GraduationCap,
];

export function blogIconIndex(slug: string): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 33) ^ slug.charCodeAt(i);
  }
  return Math.abs(hash) % BLOG_ICONS.length;
}
