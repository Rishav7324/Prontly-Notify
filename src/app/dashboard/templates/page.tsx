"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StateContainer } from "@/components/ui/StateContainer";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Plus,
  Trash2,
  Copy,
  Save,
  Loader2,
  Sparkles,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  title: string;
  body: string;
  clickUrl: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  { value: "promotional", label: "Promotional" },
  { value: "transactional", label: "Transactional" },
  { value: "engagement", label: "Engagement" },
  { value: "onboarding", label: "Onboarding" },
  { value: "re-engagement", label: "Re-engagement" },
];

type State = "default" | "loading" | "empty" | "error";

export default function TemplatesPage() {
  const { addToast } = useToast();
  const [state, setState] = useState<State>("loading");
  const [templates, setTemplates] = useState<Template[]>([]);

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [clickUrl, setClickUrl] = useState("");
  const [category, setCategory] = useState("promotional");
  const [saving, setSaving] = useState(false);

  const [copyFromCampaign, setCopyFromCampaign] = useState(false);
  const [campaignId, setCampaignId] = useState("");

  useEffect(() => {
    async function load() {
      setState("loading");
      try {
        const res = await fetch("/api/v1/templates");
        const json = await res.json();
        if (json.success) {
          setTemplates(json.data || []);
          setState(json.data?.length === 0 ? "empty" : "default");
        } else {
          setState("error");
        }
      } catch {
        setState("error");
      }
    }
    load();
  }, []);

  const fetchCampaign = async () => {
    if (!campaignId) return;
    try {
      const res = await fetch(`/api/v1/campaigns/${campaignId}`);
      const json = await res.json();
      if (json.success) {
        setTitle(json.data.title || "");
        setBody(json.data.body || "");
        setClickUrl(json.data.click_url || "");
        addToast("Campaign loaded into template", "success");
      } else {
        addToast("Campaign not found", "error");
      }
    } catch {
      addToast("Failed to fetch campaign", "error");
    }
  };

  const resetForm = () => {
    setName("");
    setTitle("");
    setBody("");
    setClickUrl("");
    setCategory("promotional");
    setCampaignId("");
    setCopyFromCampaign(false);
  };

  const handleSave = useCallback(async () => {
    if (!name || !title || !body) {
      addToast("Name, title, and body are required", "error");
      return;
    }
    setSaving(true);
    try {
      const isEdit = !!editing;
      const res = await fetch(isEdit ? `/api/v1/templates/${editing.id}` : "/api/v1/templates", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, body, click_url: clickUrl, category }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(isEdit ? "Template updated" : "Template created", "success");
        setTemplates((prev) =>
          isEdit
            ? prev.map((t) => (t.id === editing.id ? json.data : t))
            : [json.data, ...prev]
        );
        setShowCreate(false);
        setEditing(null);
        resetForm();
        setState("default");
      } else {
        addToast(json.error || "Failed to save template", "error");
      }
    } catch {
      addToast("Failed to save template", "error");
    } finally {
      setSaving(false);
    }
  }, [name, title, body, clickUrl, category, editing, addToast]);

  const handleEdit = (template: Template) => {
    setEditing(template);
    setName(template.name);
    setTitle(template.title);
    setBody(template.body);
    setClickUrl(template.clickUrl || "");
    setCategory(template.category);
    setShowCreate(true);
  };

  const handleDuplicate = async (template: Template) => {
    try {
      const res = await fetch("/api/v1/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${template.name} (Copy)`,
          title: template.title,
          body: template.body,
          click_url: template.clickUrl || "",
          category: template.category,
        }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Template duplicated", "success");
        setTemplates((prev) => [json.data, ...prev]);
      }
    } catch {
      addToast("Failed to duplicate template", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/templates/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        addToast("Template deleted", "success");
        setTemplates((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      addToast("Failed to delete template", "error");
    }
  };

  const handleApply = (template: Template) => {
    addToast(`Template "${template.name}" content copied. Use it in a new campaign.`, "info");
  };

  const columns: Column<Template>[] = [
    { key: "name", label: "Name", render: (t) => <span className="font-medium text-text-primary">{t.name}</span> },
    { key: "title", label: "Title", render: (t) => <span className="text-sm text-text-secondary truncate max-w-[200px] block">{t.title}</span> },
    {
      key: "category",
      label: "Category",
      render: (t) => <Badge variant="default" size="sm">{t.category}</Badge>,
    },
    { key: "updatedAt", label: "Updated", render: (t) => <span className="text-xs text-text-muted">{formatDate(t.updatedAt)}</span> },
    {
      key: "actions",
      label: "",
      render: (t) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => handleApply(t)} icon={<Copy className="h-3.5 w-3.5" />} />
          <Button variant="ghost" size="sm" onClick={() => handleEdit(t)} icon={<FileText className="h-3.5 w-3.5" />} />
          <Button variant="ghost" size="sm" onClick={() => handleDuplicate(t)} icon={<Copy className="h-3.5 w-3.5" />} />
          <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} icon={<Trash2 className="h-3.5 w-3.5 text-error" />} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notification Templates</h1>
          <p className="mt-1 text-sm text-text-muted">Save and reuse notification templates across campaigns</p>
        </div>
        <Button onClick={() => { setShowCreate(!showCreate); setEditing(null); resetForm(); }} icon={<Plus className="h-4 w-4" />}>
          {showCreate ? "Cancel" : "New Template"}
        </Button>
      </div>

      {showCreate && (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>{editing ? "Edit Template" : "Create Template"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-2">
              <Button
                variant={copyFromCampaign ? "primary" : "outline"}
                size="sm"
                onClick={() => setCopyFromCampaign(!copyFromCampaign)}
                icon={<Sparkles className="h-3.5 w-3.5" />}
              >
                Copy from Campaign
              </Button>
            </div>

            {copyFromCampaign && (
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label="Campaign ID"
                    placeholder="Paste campaign ID to copy content"
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                  />
                </div>
                <Button variant="secondary" size="sm" onClick={fetchCampaign} icon={<Copy className="h-3.5 w-3.5" />}>
                  Load
                </Button>
              </div>
            )}

            <Input
              label="Template Name"
              placeholder="e.g. Welcome Series"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Notification Title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-secondary">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              as="textarea"
              label="Notification Body"
              placeholder="Enter body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <Input
              label="Click URL (optional)"
              placeholder="https://example.com"
              value={clickUrl}
              onChange={(e) => setClickUrl(e.target.value)}
            />

            <div className="flex gap-3">
              <Button onClick={handleSave} loading={saving} icon={<Save className="h-4 w-4" />}>
                {editing ? "Update" : "Create"} Template
              </Button>
              <Button variant="ghost" onClick={() => { setShowCreate(false); setEditing(null); resetForm(); }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <StateContainer state={state} emptyMessage="No templates yet. Create one from a campaign or from scratch.">
        <DataTable
          columns={columns}
          data={templates}
          keyExtractor={(t) => t.id}
        />
      </StateContainer>
    </div>
  );
}