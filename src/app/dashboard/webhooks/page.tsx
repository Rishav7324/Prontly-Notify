"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StateContainer } from "@/components/ui/StateContainer";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import {
  Webhook,
  Plus,
  Trash2,
  Send,
  Loader2,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  lastDeliveredAt: string | null;
  createdAt: string;
}

interface DeliveryLog {
  id: string;
  webhookId: string;
  event: string;
  status: "success" | "failed";
  statusCode: number;
  responseBody: string | null;
  attemptedAt: string;
}

type State = "default" | "loading" | "empty" | "error";

export default function WebhooksPage() {
  const { addToast } = useToast();
  const [state, setState] = useState<State>("loading");
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<WebhookEndpoint | null>(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["campaign.sent"]);
  const [saving, setSaving] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [logsModal, setLogsModal] = useState<{ id: string; name: string } | null>(null);
  const [deliveryLogs, setDeliveryLogs] = useState<DeliveryLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  const availableEvents = [
    { value: "campaign.sent", label: "Campaign Sent" },
    { value: "campaign.delivered", label: "Campaign Delivered" },
    { value: "campaign.clicked", label: "Campaign Clicked" },
    { value: "subscriber.subscribed", label: "Subscriber Subscribed" },
    { value: "subscriber.unsubscribed", label: "Subscriber Unsubscribed" },
  ];

  useEffect(() => {
    async function load() {
      setState("loading");
      try {
        const res = await fetch("/api/v1/webhooks");
        const json = await res.json();
        if (json.success) {
          setWebhooks(json.data || []);
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

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const resetForm = () => {
    setName("");
    setUrl("");
    setSelectedEvents(["campaign.sent"]);
  };

  const handleSave = useCallback(async () => {
    if (!name || !url) {
      addToast("Name and URL are required", "error");
      return;
    }
    setSaving(true);
    try {
      const isEdit = !!editing;
      const res = await fetch(isEdit ? `/api/v1/webhooks/${editing.id}` : "/api/v1/webhooks", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url, events: selectedEvents }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(isEdit ? "Webhook updated" : "Webhook created", "success");
        setWebhooks((prev) =>
          isEdit
            ? prev.map((w) => (w.id === editing.id ? json.data : w))
            : [json.data, ...prev]
        );
        setShowCreate(false);
        setEditing(null);
        resetForm();
        setState("default");
      } else {
        addToast(json.error || "Failed to save webhook", "error");
      }
    } catch {
      addToast("Failed to save webhook", "error");
    } finally {
      setSaving(false);
    }
  }, [name, url, selectedEvents, editing, addToast]);

  const handleEdit = (webhook: WebhookEndpoint) => {
    setEditing(webhook);
    setName(webhook.name);
    setUrl(webhook.url);
    setSelectedEvents(webhook.events);
    setShowCreate(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/webhooks/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        addToast("Webhook deleted", "success");
        setWebhooks((prev) => prev.filter((w) => w.id !== id));
      } else {
        addToast(json.error, "error");
      }
    } catch {
      addToast("Failed to delete webhook", "error");
    }
  };

  const handleTest = async (id: string) => {
    setTestingId(id);
    try {
      const res = await fetch("/api/v1/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId: id }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Test delivery sent", "success");
      } else {
        addToast(json.error || "Test delivery failed", "error");
      }
    } catch {
      addToast("Test delivery failed", "error");
    } finally {
      setTestingId(null);
    }
  };

  const openLogs = async (webhook: WebhookEndpoint) => {
    setLogsModal({ id: webhook.id, name: webhook.name });
    setLogsLoading(true);
    try {
      const res = await fetch(`/api/v1/webhooks/${webhook.id}/logs`);
      const json = await res.json();
      if (json.success) {
        setDeliveryLogs(json.data || []);
      }
    } catch {
      setDeliveryLogs([]);
    } finally {
      setLogsLoading(false);
    }
  };

  const columns: Column<WebhookEndpoint>[] = [
    { key: "name", label: "Name", render: (w) => <span className="font-medium text-text-primary">{w.name}</span> },
    { key: "url", label: "URL", render: (w) => <span className="text-xs text-text-muted truncate max-w-[200px] block">{w.url}</span> },
    {
      key: "isActive",
      label: "Status",
      render: (w) => <Badge variant={w.isActive ? "success" : "default"} size="sm">{w.isActive ? "Active" : "Inactive"}</Badge>,
    },
    {
      key: "lastDeliveredAt",
      label: "Last Delivery",
      render: (w) => w.lastDeliveredAt ? formatDate(w.lastDeliveredAt) : "—",
    },
    {
      key: "actions",
      label: "",
      render: (w) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => handleTest(w.id)} loading={testingId === w.id} icon={<Send className="h-3.5 w-3.5" />} />
          <Button variant="ghost" size="sm" onClick={() => openLogs(w)} icon={<ExternalLink className="h-3.5 w-3.5" />} />
          <Button variant="ghost" size="sm" onClick={() => handleEdit(w)} icon={<ExternalLink className="h-3.5 w-3.5" />} />
          <Button variant="ghost" size="sm" onClick={() => handleDelete(w.id)} icon={<Trash2 className="h-3.5 w-3.5 text-error" />} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Webhooks</h1>
          <p className="mt-1 text-sm text-text-muted">Manage outbound webhook endpoints</p>
        </div>
        <Button onClick={() => { setShowCreate(!showCreate); setEditing(null); resetForm(); }} icon={<Plus className="h-4 w-4" />}>
          {showCreate ? "Cancel" : "Add Webhook"}
        </Button>
      </div>

      {showCreate && (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>{editing ? "Edit Webhook" : "New Webhook"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input
              label="Name"
              placeholder="e.g. Slack Notifications"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Endpoint URL"
              placeholder="https://hooks.example.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">Events</label>
              <div className="flex flex-wrap gap-2">
                {availableEvents.map((event) => (
                  <button
                    key={event.value}
                    onClick={() => toggleEvent(event.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedEvents.includes(event.value)
                        ? "bg-primary text-white"
                        : "bg-black/5 text-text-secondary hover:bg-black/10"
                    }`}
                  >
                    {event.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} loading={saving} icon={<Plus className="h-4 w-4" />}>
                {editing ? "Update" : "Create"} Webhook
              </Button>
              <Button variant="ghost" onClick={() => { setShowCreate(false); setEditing(null); resetForm(); }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <StateContainer state={state} emptyMessage="No webhooks configured.">
        <DataTable
          columns={columns}
          data={webhooks}
          keyExtractor={(w) => w.id}
        />
      </StateContainer>

      <Modal open={!!logsModal} onClose={() => setLogsModal(null)} title={`Delivery Logs — ${logsModal?.name}`} size="lg">
        {logsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : deliveryLogs.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">No delivery logs yet.</p>
        ) : (
          <div className="space-y-2">
            {deliveryLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <div className="flex items-center gap-3">
                  {log.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-error" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-text-primary">{log.event}</p>
                    <p className="text-xs text-text-muted">{formatDate(log.attemptedAt)}</p>
                  </div>
                </div>
                <Badge variant={log.status === "success" ? "success" : "error"} size="sm">
                  {log.statusCode}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}