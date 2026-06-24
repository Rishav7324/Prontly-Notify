import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "Blog | Prontly Notify",
  description:
    "Tips, guides, and best practices for browser push notifications, audience engagement, and growth marketing.",
};

const categories = ["All", "Push Notifications", "Guides", "Growth", "Product", "Case Studies"];

const posts = [
  {
    title: "How Browser Push Notifications Can Recover 30% of Lost Traffic",
    excerpt:
      "Learn how publishers and e-commerce stores are using browser push to bring back visitors who would otherwise never return.",
    category: "Push Notifications",
    date: "Jun 18, 2026",
    readTime: "5 min read",
    slug: "recover-lost-traffic-push-notifications",
    featured: true,
  },
  {
    title: "AI-Powered Push: Writing Notifications That Get Clicked",
    excerpt:
      "Our AI model was trained on 10M+ notifications. Here's what we learned about what makes a high-CTR push.",
    category: "Guides",
    date: "Jun 14, 2026",
    readTime: "7 min read",
    slug: "ai-push-notifications-ctr",
  },
  {
    title: "Push Notification Benchmarks 2026: CTR, Opt-In Rates & More",
    excerpt:
      "Industry benchmarks every marketer should know. Compare your performance against the averages.",
    category: "Growth",
    date: "Jun 10, 2026",
    readTime: "4 min read",
    slug: "push-notification-benchmarks-2026",
  },
  {
    title: "Why We Chose Cloudflare D1 Over Postgres for Our SaaS",
    excerpt:
      "A technical deep dive into our edge-first architecture and why it lets us offer a genuinely usable free tier.",
    category: "Product",
    date: "Jun 5, 2026",
    readTime: "8 min read",
    slug: "cloudflare-d1-over-postgres-saas",
  },
  {
    title: "How a Food Blog Grew Return Traffic by 2.5x in 30 Days",
    excerpt:
      "Case study: How TheSpiceRoute.in used Prontly Notify to turn one-time visitors into regular readers.",
    category: "Case Studies",
    date: "May 28, 2026",
    readTime: "6 min read",
    slug: "food-blog-return-traffic-case-study",
  },
  {
    title: "Push vs Email: Which Channel Drives More Re-Engagement?",
    excerpt:
      "We compare open rates, CTR, and conversion data across push and email for the same audience segments.",
    category: "Guides",
    date: "May 22, 2026",
    readTime: "5 min read",
    slug: "push-vs-email-re-engagement",
  },
  {
    title: "Introducing Behavioral Automation: Trigger Drips Based on Actions",
    excerpt:
      "Our new automation engine lets you send the right message at the right moment — without manual effort.",
    category: "Product",
    date: "May 15, 2026",
    readTime: "3 min read",
    slug: "behavioral-automation-launch",
  },
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="info" className="mb-4">Blog</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold md:text-5xl">
            Prontly Notify Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Tips, guides, and best practices for browser push notifications and
            audience engagement.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                cat === "All"
                  ? "bg-primary text-white"
                  : "border border-border text-text-secondary hover:bg-white/5 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 block overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="bg-gradient-to-br from-primary/10 to-surface p-8 md:p-12">
              <Badge variant="primary" className="mb-4">Featured</Badge>
              <h2 className="font-display mb-3 text-2xl font-bold md:text-3xl group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="mb-4 max-w-2xl text-text-secondary">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Badge variant="info" size="sm" className="mb-3">
                {post.category}
              </Badge>
              <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mb-4 text-sm text-text-secondary line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="my-16 rounded-2xl border border-border bg-surface p-8 md:p-12">
          <div className="mx-auto max-w-xl text-center">
            <Badge variant="info" className="mb-4">Newsletter</Badge>
            <h3 className="font-display mb-3 text-2xl font-bold">
              Get the latest posts
            </h3>
            <p className="mb-6 text-sm text-text-secondary">
              Subscribe to our newsletter and receive new articles, tips, and
              product updates every week.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-600"
              >
                Subscribe
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border pt-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
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
                    ? "bg-primary text-white"
                    : "border border-border text-text-secondary hover:bg-white/5 hover:text-text-primary"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
          >
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
