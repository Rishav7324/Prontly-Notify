import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Share2, Globe, MessageCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog Post | Prontly Notify",
  description: "Read the latest from Prontly Notify.",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

const postData: Record<string, {
  title: string;
  excerpt: string;
  content: string[];
  author: { name: string; role: string; initials: string };
  date: string;
  readTime: string;
  category: string;
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

const relatedPosts = [
  {
    title: "AI-Powered Push: Writing Notifications That Get Clicked",
    slug: "ai-push-notifications-ctr",
  },
  {
    title: "Push Notification Benchmarks 2026",
    slug: "push-notification-benchmarks-2026",
  },
  {
    title: "Push vs Email: Which Channel Drives More Re-Engagement?",
    slug: "push-vs-email-re-engagement",
  },
];

const tocItems = [
  "The traffic problem",
  "How push notifications solve it",
  "Timing strategies",
  "Relevance & segmentation",
  "Testing & optimization",
  "The bottom line",
];

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = postData[slug];

  if (!post) {
    notFound();
  }

  const shareUrl = `https://prontly.in/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Prontly Notify",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://prontly.in/blog/${slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="lg:flex lg:gap-12">
        {/* Table of Contents - Desktop */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              On this page
            </h4>
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block text-sm text-text-muted transition-colors hover:text-text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Article */}
        <article className="min-w-0 flex-1">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <Badge variant="info" className="mb-4">{post.category}</Badge>
          <h1 className="font-display mb-4 text-3xl font-bold md:text-4xl">
            {post.title}
          </h1>
          <p className="mb-6 text-lg text-text-secondary">{post.excerpt}</p>

          {/* Author & Meta */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-text-muted">{post.author.role}</p>
              </div>
            </div>
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

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {post.content.map((paragraph, i) => (
              <p key={i} className="mb-6 leading-relaxed text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share */}
          <div className="mt-12 flex items-center gap-4 border-t border-border pt-6">
            <span className="flex items-center gap-2 text-sm text-text-muted">
              <Share2 className="size-4" />
              Share this post
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                aria-label="Share on Twitter"
              >
                <Globe className="size-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                aria-label="Share on LinkedIn"
              >
                <MessageCircle className="size-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                aria-label="Share on Facebook"
              >
                <Share2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h3 className="font-display mb-6 text-2xl font-bold">
              Related posts
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                    {rp.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
