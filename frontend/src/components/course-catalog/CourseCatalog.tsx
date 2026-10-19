"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Course } from "@/lib/types";
import CourseCard from "@/components/sections/CourseCard";

function normalize(value: string): string {
  return value.toLowerCase().replace(/[ʻʼ'`’]/g, "");
}

export default function CourseCatalog({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Barchasi");

  const categories = useMemo(
    () => ["Barchasi", ...Array.from(new Set(courses.map((c) => c.category)))],
    [courses],
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    return courses.filter((c) => {
      const matchesCategory = category === "Barchasi" || c.category === category;
      const matchesQuery = q.length === 0 || normalize(c.title).includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [courses, query, category]);

  return (
    <div>
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kurs nomini qidirish..."
          className="w-full rounded-full border border-border bg-cream py-2.5 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-brand"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              category === cat
                ? "bg-brand text-cream"
                : "border border-border bg-cream text-ink-soft hover:border-brand hover:text-brand"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-ink-soft">
        {filtered.length} ta kurs topildi
      </p>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink-soft">
          Hech qanday kurs topilmadi. Boshqa nom bilan qidirib koʻring.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
