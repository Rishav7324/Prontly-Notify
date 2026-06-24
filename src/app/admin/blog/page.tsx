"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { cn, formatDate, generateId } from "@/lib/utils";
import {
  FileText,
  Plus,
  Search,
  CalendarClock,
  Image,
  Settings2,
  Globe,
  Save,
  Send,
  FileEdit,
  Loader2,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  status: "draft" | "scheduled" | "published";
  author: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  featuredImage: string | null;
  scheduledDate?: string;
}

const categories = ["All", "Product", "Guides", "Updates", "Security"];
const statusFilters = [
  { id: "all", label: "All Posts" },
  { id: "draft", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
];

async function fetchPosts(status?: string) {
  const params = new URLSearchParams({ limit: "50" });
  if (status && status !== "all") params.set("status", status);
  const res = await fetch(`/api/v1/admin/blog/posts?${params.toString()}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch posts");
  return { posts: json.data, meta: json.meta };
}

async function createPost(data: any) {
  const res = await fetch("/api/v1/admin/blog/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to create post");
  return json.data;
}

export default function AdminBlog() {
  const { addToast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { posts: data } = await fetchPosts(statusFilter !== "all" ? statusFilter : undefined);
      setPosts(data.map((p: any) => ({
        id: p.id,
        title: p.title,
        status: p.status,
        author: p.author_id || "Super Admin",
        date: p.published_at || p.created_at,
        category: p.category || "Uncategorized",
        tags: [],
        content: "",
        metaTitle: "",
        metaDescription: "",
        slug: p.slug,
        featuredImage: null,
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, addToast]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filteredPosts = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost({ ...post });
    } else {
      setEditingPost({
        id: generateId(),
        title: "",
        status: "draft",
        author: "Super Admin",
        date: new Date().toISOString().split("T")[0],
        category: "Product",
        tags: [],
        content: "",
        metaTitle: "",
        metaDescription: "",
        slug: "",
        featuredImage: null,
      });
    }
    setEditorOpen(true);
  };

  const savePost = async (publish = false) => {
    if (!editingPost) return;
    setSaving(true);
    try {
      const body: any = {
        title: editingPost.title,
        slug: editingPost.slug || editingPost.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        category: editingPost.category,
        excerpt: editingPost.metaDescription || null,
        status: publish ? "published" : editingPost.status,
        seo_title: editingPost.metaTitle || null,
        seo_description: editingPost.metaDescription || null,
        tags: editingPost.tags,
        body_mdx: editingPost.content || null,
      };
      if (editingPost.scheduledDate) {
        body.status = "scheduled";
      }
      const result = await createPost(body);
      addToast(publish ? "Post published" : "Post saved as draft", "success");
      setEditorOpen(false);
      setEditingPost(null);
      loadPosts();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<BlogPost>[] = [
    { key: "title", label: "Title", sortable: true, render: (item) => (
      <div className="flex items-center gap-3">
        <FileText className="size-4 shrink-0 text-text-muted" />
        <div>
          <p className="font-medium text-text-primary">{item.title}</p>
          <p className="text-xs text-text-muted">{item.category}</p>
        </div>
      </div>
    )},
    { key: "status", label: "Status", sortable: true, render: (item) => {
      const v = item.status === "published" ? "success" : item.status === "scheduled" ? "warning" : "default";
      return <Badge variant={v}>{item.status}</Badge>;
    }},
    { key: "author", label: "Author", sortable: true, render: (item) => <span className="text-text-secondary">{item.author}</span>},
    { key: "date", label: "Date", sortable: true, render: (item) => (
      <div className="flex items-center gap-1.5 text-text-muted">
        <CalendarClock className="size-3.5" />
        {formatDate(item.date)}
      </div>
    )},
    { key: "actions", label: "Actions", render: (item) => (
      <Button variant="outline" size="sm" icon={<FileEdit className="size-3.5" />} onClick={() => openEditor(item)}>Edit</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Blog CMS</h1>
          <p className="mt-1 text-sm text-text-muted">Create and manage blog posts</p>
        </div>
        <Button icon={<Plus className="size-4" />} onClick={() => openEditor()}>New Post</Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search blog posts"
          />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                statusFilter === f.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {!loading && filteredPosts.length === 0 ? (
        <EmptyState icon={<FileText className="size-12" />} title="No posts found" description="Create your first blog post" action={<Button icon={<Plus className="size-4" />} onClick={() => openEditor()}>New Post</Button>} />
      ) : (
        <DataTable columns={columns} data={filteredPosts} keyExtractor={(p) => p.id} loading={loading} sortable />
      )}

      <Modal open={editorOpen} onClose={() => { setEditorOpen(false); setEditingPost(null); }} title="Edit Post" size="xl">
        {editingPost && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            <Input
              label="Title"
              placeholder="Post title..."
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
            />

            <Input
              as="textarea"
              label="Content"
              placeholder="Write your post content here..."
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              containerClassName="min-h-[200px]"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-secondary">Category</label>
                <select
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Tags"
                placeholder="Comma separated"
                value={editingPost.tags.join(", ")}
                onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Featured Image</label>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/5">
                  {editingPost.featuredImage ? (
                    <img src={editingPost.featuredImage} alt="Featured" className="h-full w-full rounded-lg object-cover" />
                  ) : (
                    <Image className="size-6 text-text-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-muted">Upload an image or enter URL</p>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={editingPost.featuredImage || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value || null })}
                    containerClassName="mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Settings2 className="size-4 text-text-muted" />
                SEO Settings
              </h4>
              <div className="space-y-4">
                <Input
                  label="Meta Title"
                  placeholder="SEO title..."
                  value={editingPost.metaTitle}
                  onChange={(e) => setEditingPost({ ...editingPost, metaTitle: e.target.value })}
                />
                <Input
                  as="textarea"
                  label="Meta Description"
                  placeholder="SEO description..."
                  value={editingPost.metaDescription}
                  onChange={(e) => setEditingPost({ ...editingPost, metaDescription: e.target.value })}
                />
                <Input
                  label="Slug"
                  placeholder="post-url-slug"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  icon={<Globe className="size-4 text-text-muted" />}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <Input
                  label="Schedule (optional)"
                  type="datetime-local"
                  value={editingPost.scheduledDate || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, scheduledDate: e.target.value || undefined, status: e.target.value ? "scheduled" : "draft" })}
                  containerClassName="mb-0"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" icon={<Save className="size-4" />} onClick={() => savePost(false)} loading={saving}>
                  Save Draft
                </Button>
                {editingPost.scheduledDate ? (
                  <Button variant="primary" icon={<CalendarClock className="size-4" />} onClick={() => savePost(false)} loading={saving}>
                    Schedule
                  </Button>
                ) : (
                  <Button variant="primary" icon={<Send className="size-4" />} onClick={() => savePost(true)} loading={saving}>
                    Publish
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
