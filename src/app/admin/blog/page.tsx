"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { cn, formatDate, generateId } from "@/lib/utils";
import {
  FileText,
  Plus,
  Search,
  CalendarClock,
  Clock,
  Eye,
  Image,
  Settings2,
  Globe,
  Tag,
  Save,
  Send,
  FileEdit,
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

const initialPosts: BlogPost[] = [
  { id: "1", title: "Introducing AI-Powered Campaigns", status: "published", author: "Sarah Chen", date: "2024-07-15", category: "Product", tags: ["AI", "features"], content: "", metaTitle: "", metaDescription: "", slug: "ai-campaigns", featuredImage: null },
  { id: "2", title: "Best Practices for Push Notification CTR", status: "draft", author: "Mike Ross", date: "2024-07-12", category: "Guides", tags: ["best-practices", "ctr"], content: "", metaTitle: "", metaDescription: "", slug: "push-ctr-best-practices", featuredImage: null },
  { id: "3", title: "Q3 2024 Platform Updates", status: "scheduled", author: "Sarah Chen", date: "2024-07-10", category: "Updates", tags: ["product-update"], content: "", metaTitle: "", metaDescription: "", slug: "q3-2024-updates", featuredImage: null, scheduledDate: "2024-07-20" },
  { id: "4", title: "How to Segment Your Audience", status: "published", author: "Alex Kim", date: "2024-07-08", category: "Guides", tags: ["segmentation"], content: "", metaTitle: "", metaDescription: "", slug: "audience-segmentation", featuredImage: null },
  { id: "5", title: "Enterprise Security Overview", status: "draft", author: "Mike Ross", date: "2024-07-05", category: "Security", tags: ["security", "enterprise"], content: "", metaTitle: "", metaDescription: "", slug: "enterprise-security", featuredImage: null },
];

const categories = ["All", "Product", "Guides", "Updates", "Security"];
const statusFilters = [
  { id: "all", label: "All Posts" },
  { id: "draft", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, search, statusFilter]);

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

  const savePost = (publish = false) => {
    if (!editingPost) return;
    const updated = { ...editingPost, status: publish ? "published" : editingPost.status };
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [...prev, updated];
    });
    setEditorOpen(false);
    setEditingPost(null);
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
      <Button variant="outline" size="sm" icon={<FileEdit className="size-3.5" />} onClick={() => openEditor(item)}>
        Edit
      </Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Blog CMS</h1>
          <p className="mt-1 text-sm text-text-muted">Create and manage blog posts</p>
        </div>
        <Button icon={<Plus className="size-4" />} onClick={() => openEditor()}>
          New Post
        </Button>
      </div>

      {/* Filters */}
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

      <DataTable columns={columns} data={filteredPosts} keyExtractor={(p) => p.id} loading={loading} sortable />

      {/* Editor Modal */}
      <Modal open={editorOpen} onClose={() => { setEditorOpen(false); setEditingPost(null); }} title="Edit Post" size="xl">
        {editingPost && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Title */}
            <Input
              label="Title"
              placeholder="Post title..."
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
            />

            {/* Content */}
            <Input
              as="textarea"
              label="Content"
              placeholder="Write your post content here..."
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              containerClassName="min-h-[200px]"
            />

            {/* Meta info row */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                options={categories.filter((c) => c !== "All").map((c) => ({ value: c, label: c }))}
                value={editingPost.category}
                onChange={(v) => setEditingPost({ ...editingPost, category: v })}
              />
              <Input
                label="Tags"
                placeholder="Comma separated"
                value={editingPost.tags.join(", ")}
                onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
              />
            </div>

            {/* Featured Image */}
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

            {/* SEO Panel */}
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

            {/* Publish/Schedule controls */}
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
                <Button variant="outline" icon={<Save className="size-4" />} onClick={() => savePost(false)}>
                  Save Draft
                </Button>
                {editingPost.scheduledDate ? (
                  <Button variant="primary" icon={<CalendarClock className="size-4" />} onClick={() => savePost(false)}>
                    Schedule
                  </Button>
                ) : (
                  <Button variant="primary" icon={<Send className="size-4" />} onClick={() => savePost(true)}>
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
