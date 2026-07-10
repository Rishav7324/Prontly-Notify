"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/domain/PostCard";
import { Loader2 } from "lucide-react";

const categories = [
  "All",
  "Campaigns",
  "Analytics",
  "Automation",
  "Case Studies",
  "Product Updates",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/v1/admin/blog/posts")
      .then((r) => r.json())
      .then((d) => { if (d.success) setPosts(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p: any) => p.featured);
  const rest = filtered.filter((p: any) => !p.featured);

  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-4 py-24">
        <div className="mb-12 text-center">
          <Badge variant="info" className="mb-4">Blog</Badge>
          <h1 className="font-display text-[36px] font-bold leading-tight text-text-primary md:text-[48px]">
            Prontly Notify Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
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
                  : "border border-border text-text-secondary hover:bg-black/5 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-text-muted">No blog posts yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <div className="md:col-span-2 lg:col-span-3">
                <div className="mb-6">
                  <Badge variant="primary" className="mb-4 w-fit">Featured</Badge>
                  <PostCard
                    title={featured.title}
                    excerpt={featured.excerpt}
                    slug={featured.slug}
                    category={featured.category}
                    date={featured.date}
                    readTime={featured.readTime}
                    imageUrl={featured.imageUrl}
                  />
                </div>
              </div>
            )}
            {rest.map((post: any) => (
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
              <h3 className="font-display mb-3 text-2xl font-bold text-text-primary">
                Get the latest posts
              </h3>
              <p className="mb-6 text-sm text-text-secondary">
                Subscribe and receive new articles, tips, and product updates every week.
              </p>
              <form className="flex w-full max-w-sm gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
                />
                <Button type="submit" size="md">
                  <Send className="size-4" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
