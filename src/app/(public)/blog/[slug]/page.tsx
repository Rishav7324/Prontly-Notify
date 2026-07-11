"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Share2,
  Globe,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/v1/admin/blog/posts?slug=${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setPost(json.data);
          setRelated(json.data.related || []);
        }
      } catch {}
      setLoading(false);
    }
    load();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <Loader2 className="size-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-text-primary">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
      </div>
    );
  }

  const shareUrl = `https://notify.prontly.in/blog/${slug}`;

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 z-50 h-[3px] bg-primary transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:flex lg:gap-12">
        <aside className="hidden shrink-0 lg:block lg:w-16">
          <div className="sticky top-24 flex flex-col items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">Share</span>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
              className="flex size-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Share on Twitter"
            >
              <Globe className="size-4" />
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
              className="flex size-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Share on LinkedIn"
            >
              <MessageCircle className="size-4" />
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
              className="flex size-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Share on Facebook"
            >
              <Share2 className="size-4" />
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Copy link"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </aside>

        <article ref={contentRef} className="min-w-0 flex-1 max-w-[720px] mx-auto">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <Badge variant="info" className="mb-4">{post.category}</Badge>
          <h1 className="font-display text-[36px] font-bold leading-tight text-text-primary">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">{post.excerpt}</p>

          <div className="mb-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {post.author.name?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{post.author.name}</p>
                  {post.author.role && <p className="text-xs text-text-muted">{post.author.role}</p>}
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-background">
            {post.imageUrl ? (
              <img src={post.imageUrl} alt="" className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Globe className="size-20 text-primary/20" />
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            {(post.content || []).map((paragraph: string, i: number) => (
              <p key={i} className="mb-6 leading-relaxed text-text-secondary">{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-border pt-6">
            <span className="flex items-center gap-2 text-sm text-text-muted">
              <Share2 className="size-4" />
              Share this post
            </span>
            <div className="flex gap-2 lg:hidden">
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
                aria-label="Share on Twitter"
              >
                <Globe className="size-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
                aria-label="Share on LinkedIn"
              >
                <MessageCircle className="size-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
                aria-label="Share on Facebook"
              >
                <Share2 className="size-4" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
