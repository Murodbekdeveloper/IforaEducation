import { BLOG_ICONS, blogIconIndex } from "@/lib/blog-icon";

export default function BlogCoverArt({
  slug,
  coverColor,
  className = "h-32",
}: {
  slug: string;
  coverColor: string;
  className?: string;
}) {
  const Icon = BLOG_ICONS[blogIconIndex(slug)];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(150deg, ${coverColor} 0%, ${coverColor}CC 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(251,247,241,0.9) 1px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10"
      />
      <Icon
        aria-hidden
        size={104}
        strokeWidth={1.1}
        className="pointer-events-none absolute -bottom-5 -right-5 text-media-light/20"
      />
      <span className="relative m-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-media-light/15 text-media-light backdrop-blur-sm">
        <Icon size={20} strokeWidth={1.75} />
      </span>
    </div>
  );
}
