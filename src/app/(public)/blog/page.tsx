"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Send,
  Search,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PostCard } from "@/components/domain/PostCard";

const categories = [
  "All",
  "Campaigns",
  "Analytics",
  "Automation",
  "Case Studies",
  "Product Updates",
];

const posts = [
  {
    title: "How Browser Push Notifications Can Recover 30% of Lost Traffic",
    excerpt:
      "Learn how publishers and e-commerce stores are using browser push to bring back visitors who would otherwise never return.",
    category: "Campaigns",
    date: "Jun 18, 2026",
    readTime: "5 min read",
    slug: "recover-lost-traffic-push-notifications",
    featured: true,
    imageUrl: "",
    author: { name: "Rohan Mehta", initials: "RM" },
  },
  {
    title: "AI-Powered Push: Writing Notifications That Get Clicked",
    excerpt:
      "Our AI model was trained on 10M+ notifications. Here's what we learned about what makes a high-CTR push.",
    category: "Analytics",
    date: "Jun 14, 2026",
    readTime: "7 min read",
    slug: "ai-push-notifications-ctr",
    imageUrl: "",
    author: { name: "Priya Kapoor", initials: "PK" },
  },
  {
    title: "Push Notification Benchmarks 2026: CTR, Opt-In Rates & More",
    excerpt:
      "Industry benchmarks every marketer should know. Compare your performance against the averages.",
    category: "Analytics",
    date: "Jun 10, 2026",
    readTime: "4 min read",
    slug: "push-notification-benchmarks-2026",
    imageUrl: "",
    author: { name: "Rahul Nair", initials: "RN" },
  },
  {
    title: "Why We Chose Cloudflare D1 Over Postgres for Our SaaS",
    excerpt:
      "A technical deep dive into our edge-first architecture and why it lets us offer a genuinely usable free tier.",
    category: "Product Updates",
    date: "Jun 5, 2026",
    readTime: "8 min read",
    slug: "cloudflare-d1-over-postgres-saas",
    imageUrl: "",
    author: { name: "Arjun Verma", initials: "AV" },
  },
  {
    title: "How a Food Blog Grew Return Traffic by 2.5x in 30 Days",
    excerpt:
      "Case study: How TheSpiceRoute.in used Prontly Notify to turn one-time visitors into regular readers.",
    category: "Case Studies",
    date: "May 28, 2026",
    readTime: "6 min read",
    slug: "food-blog-return-traffic-case-study",
    imageUrl: "",
    author: { name: "Sneha Iyer", initials: "SI" },
  },
  {
    title: "Push vs Email: Which Channel Drives More Re-Engagement?",
    excerpt:
      "We compare open rates, CTR, and conversion data across push and email for the same audience segments.",
    category: "Campaigns",
    date: "May 22, 2026",
    readTime: "5 min read",
    slug: "push-vs-email-re-engagement",
    imageUrl: "",
    author: { name: "Rohan Mehta", initials: "RM" },
  },
  {
    title: "Introducing Behavioral Automation: Trigger Drips Based on Actions",
    excerpt:
      "Our new automation engine lets you send the right message at the right moment — without manual effort.",
    category: "Automation",
    date: "May 15, 2026",
    readTime: "3 min read",
    slug: "behavioral-automation-launch",
    imageUrl: "",
    author: { name: "Priya Kapoor", initials: "PK" },
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-4 py-24">
        <div className="mb-12 text-center">
          <Badge variant="info" className="mb-4">Blog</Badge>
          <h1 className="font-display text-[36px] font-bold leading-tight text-[#F8FAFC] md:text-[48px]">
            Prontly Notify Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
            Tips, guides, and best practices for browser push notifications and
            audience engagement.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                cat === activeCategory
                  ? "bg-[#3B82F6] text-white"
                  : "border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 flex flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] md:flex-row"
          >
            <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-[#0F172A] md:w-[40%]">
              <User className="size-16 text-[#3B82F6]/30" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/10 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
              <Badge variant="primary" className="mb-4 w-fit">Featured</Badge>
              <h2 className="font-display mb-3 text-2xl font-bold text-[#F8FAFC] transition-colors group-hover:text-[#3B82F6] md:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-4 max-w-2xl text-[#94A3B8]">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {featured.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5" />
                  {featured.author.name}
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              imageUrl={post.imageUrl}
            />
          ))}

          <div
            className="flex flex-col items-center justify-center rounded-xl border p-8 text-center"
            style={{
              borderColor: "rgba(59,130,246,0.3)",
              background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(30,58,138,0.25))",
            }}
          >
            <Badge variant="info" className="mb-4">Newsletter</Badge>
            <h3 className="font-display mb-3 text-2xl font-bold text-[#F8FAFC]">
              Get the latest posts
            </h3>
            <p className="mb-6 text-sm text-[#94A3B8]">
              Subscribe and receive new articles, tips, and product updates every week.
            </p>
            <form className="flex w-full max-w-sm gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0F172A] px-4 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#64748B] outline-none focus:border-[#3B82F6]/50"
              />
              <Button type="submit" size="md">
                <Send className="size-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] pt-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-medium text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC] disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="size-4" />
            Previous
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  page === 1
                    ? "bg-[#3B82F6] text-white"
                    : "border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-medium text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
