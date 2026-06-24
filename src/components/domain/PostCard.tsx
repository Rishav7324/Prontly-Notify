"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock } from "lucide-react";

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  className?: string;
}

export function PostCard({ title, excerpt, slug, category, date, readTime, imageUrl, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group block rounded-xl border border-border bg-surface overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg",
        className
      )}
    >
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-background">
          <img src={imageUrl} alt={title} className="size-full object-cover transition-transform group-hover:scale-105" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="info" size="sm">{category}</Badge>
        </div>
        <h3 className="font-display mb-1 text-base font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mb-3 text-sm text-text-muted line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1"><Calendar className="size-3" />{date}</span>
          <span className="flex items-center gap-1"><Clock className="size-3" />{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
