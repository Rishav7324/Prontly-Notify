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
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const postData: Record<string, {
  title: string;
  excerpt: string;
  content: string[];
  author: { name: string; role: string; initials: string; avatar?: string };
  date: string;
  readTime: string;
  category: string;
  heroImage?: string;
}> = {
  "recover-lost-traffic-push-notifications": {
    title: "How Browser Push Notifications Can Recover 30% of Lost Traffic",
    excerpt: "Learn how publishers and e-commerce stores are using browser push to bring back visitors who would otherwise never return.",
    content: [
      "Every website owner knows the feeling: you publish great content, drive traffic, and then watch 95% of your visitors leave and never come back. It's the fundamental challenge of the modern web — and it's exactly the problem browser push notifications were built to solve.",
      "Unlike email, which requires a visitor to hand over their address, or social media, where algorithms decide who sees your content, browser push notifications create a direct, permission-based channel between you and your audience. The opt-in is a single click, and the delivery rate is near 100%.",
      "Our data across 2,000+ websites shows that sites using browser push notifications recover an average of 30% of lost traffic within the first 90 days. Here's how they do it.",
      "First, the timing matters. Sending a notification within 24 hours of a visitor's last session — especially when they've read an article or browsed a product — dramatically increases the likelihood they'll return. Our AI scheduling engine optimizes for this automatically.",
      "Second, relevance is everything. Generic 'we miss you' messages underperform targeted updates by 4x. Segment your audience by what they actually engaged with, and you'll see CTRs of 8-12% instead of the 2-3% industry average.",
      "Finally, test everything. The difference between 'Your cart is waiting' and 'Complete your purchase — 10% off' can be a 200% swing in conversion rate. A/B testing is built into every Prontly Notify campaign for exactly this reason.",
      "Browser push isn't a replacement for email or social — it's a complement. But for the specific job of bringing a visitor back to your site in the first 7 days, nothing else comes close.",
    ],
    author: { name: "Rohan Mehta", role: "Product Marketing", initials: "RM" },
    date: "Jun 18, 2026",
    readTime: "5 min read",
    category: "Push Notifications",
  },
};

const allPosts = [
  { title: "AI-Powered Push: Writing Notifications That Get Clicked", slug: "ai-push-notifications-ctr", category: "Guides" },
  { title: "Push Notification Benchmarks 2026", slug: "push-notification-benchmarks-2026", category: "Growth" },
  { title: "Push vs Email: Which Channel Drives More Re-Engagement?", slug: "push-vs-email-re-engagement", category: "Guides" },
];

const tocItems = [
  { id: "traffic-problem", label: "The traffic problem" },
  { id: "how-push-solves", label: "How push notifications solve it" },
  { id: "timing-strategies", label: "Timing strategies" },
  { id: "relevance-segmentation", label: "Relevance & segmentation" },
  { id: "testing-optimization", label: "Testing & optimization" },
  { id: "bottom-line", label: "The bottom line" },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = postData[slug];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeToc, setActiveToc] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const headings = document.querySelectorAll("[data-heading-id]");
      let current = "";
      headings.forEach((h) => {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 120) current = h.getAttribute("data-heading-id") || "";
      });
      if (current) setActiveToc(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-[#F8FAFC]">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-[#3B82F6] hover:underline">
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
      </div>
    );
  }

  const shareUrl = `https://prontly.in/blog/${slug}`;

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 z-50 h-[3px] bg-[#3B82F6] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:flex lg:gap-12">
        <aside className="hidden shrink-0 lg:block lg:w-16">
          <div className="sticky top-24 flex flex-col items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-[#64748B]">Share</span>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
              aria-label="Share on Twitter"
            >
              <Globe className="size-4" />
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
              aria-label="Share on LinkedIn"
            >
              <MessageCircle className="size-4" />
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
              aria-label="Share on Facebook"
            >
              <Share2 className="size-4" />
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
              aria-label="Copy link"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </aside>

        <article ref={contentRef} className="min-w-0 flex-1 max-w-[720px] mx-auto">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <Badge variant="info" className="mb-4">{post.category}</Badge>
          <h1 className="font-display text-[36px] font-bold leading-tight text-[#F8FAFC]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-[#94A3B8]">{post.excerpt}</p>

          <div className="mb-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#3B82F6]/20 text-sm font-semibold text-[#3B82F6]">
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-[#F8FAFC]">{post.author.name}</p>
                <p className="text-xs text-[#64748B]">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#64748B]">
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

          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#0F172A]">
            <div className="flex size-full items-center justify-center">
              <Globe className="size-20 text-[#3B82F6]/20" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/10 to-transparent" />
          </div>

          <div className="prose prose-invert max-w-none">
            {post.content.map((paragraph, i) => (
              <div key={i}>
                <p
                  data-heading-id={tocItems[i]?.id}
                  className="mb-6 leading-relaxed text-[#94A3B8]"
                >
                  {paragraph}
                </p>
                {i === 1 && (
                  <div
                    className="mb-8 rounded-xl border p-6 md:p-8"
                    style={{
                      borderColor: "rgba(59,130,246,0.3)",
                      background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(30,58,138,0.15))",
                    }}
                  >
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
                      <Sparkles className="size-3.5" />
                      Try Prontly Notify
                    </div>
                    <h3 className="font-display mt-4 text-xl font-bold text-[#F8FAFC]">
                      Recover lost traffic with AI-powered push
                    </h3>
                    <p className="mt-2 text-sm text-[#94A3B8]">
                      Join 2,400+ websites using Prontly Notify to bring visitors back. Free plan available.
                    </p>
                    <Link href="/signup">
                      <Button variant="primary" size="lg" className="mt-4 rounded-full">
                        Start Free — No Card Required
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-[rgba(255,255,255,0.08)] pt-6">
            <span className="flex items-center gap-2 text-sm text-[#64748B]">
              <Share2 className="size-4" />
              Share this post
            </span>
            <div className="flex gap-2 lg:hidden">
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                aria-label="Share on Twitter"
              >
                <Globe className="size-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                aria-label="Share on LinkedIn"
              >
                <MessageCircle className="size-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                aria-label="Share on Facebook"
              >
                <Share2 className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/20 text-lg font-bold text-[#3B82F6]">
                {post.author.initials}
              </div>
              <div>
                <p className="text-base font-semibold text-[#F8FAFC]">{post.author.name}</p>
                <p className="text-sm text-[#64748B]">{post.author.role}</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Rohan writes about push notification strategies, growth marketing, and the future of audience re-engagement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="font-display mb-6 text-2xl font-bold text-[#F8FAFC]">
              Related posts
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {allPosts.slice(0, 2).map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Badge variant="info" size="sm" className="mb-2">{rp.category}</Badge>
                  <p className="text-sm font-medium text-[#F8FAFC] transition-colors group-hover:text-[#3B82F6]">
                    {rp.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              On this page
            </h4>
            <ul className="space-y-2 border-l border-[rgba(255,255,255,0.08)]">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                      activeToc === item.id
                        ? "border-[#3B82F6] text-[#F8FAFC]"
                        : "border-transparent text-[#64748B] hover:text-[#94A3B8]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
