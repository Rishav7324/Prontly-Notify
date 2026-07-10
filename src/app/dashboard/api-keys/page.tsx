"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/domain/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  Key,
  Copy,
  Trash2,
  Shield,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  created: string;
  lastUsed: string | null;
  revoked: boolean;
}

const scopeColors: Record<string, string> = {
  "push:send": "info",
  "subscribers:read": "success",
  "analytics:read": "warning",
};

export default function ApiKeysPage() {
  const { addToast } = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerate, setShowGenerate] = useState(false);
  const [showRevoke, setShowRevoke] = useState<string | null>(null);
  const [showKeyValue, setShowKeyValue] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScopes, setNewKeyScopes] = useState<string[]>(["push:send"]);
  const [generatedKeyValue, setGeneratedKeyValue] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/api-keys");
        const json = await res.json();
        if (json.success) setKeys(json.data);
      } catch {
        addToast("Failed to load API keys", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const toggleScope = (scope: string) => {
    setNewKeyScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleGenerate = async () => {
    if (!newKeyName) {
      addToast("Please enter a key name", "error");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/v1/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName, scopes: newKeyScopes }),
      });
      const json = await res.json();
      if (json.success) {
        setKeys((prev) => [json.data.key, ...prev]);
        setGeneratedKeyValue(json.data.key_value ?? json.data.key ?? "key_value_here");
        setShowGenerate(false);
        setShowKeyValue(true);
        setNewKeyName("");
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to generate key", "error");
    } finally {
      setGenerating(false);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/api-keys/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        addToast("API key revoked", "success");
        setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, revoked: true } : k)));
        setShowRevoke(null);
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to revoke key", "error");
    }
  };

  const columns: Column<ApiKey>[] = [
    { key: "name", label: "Name", render: (k) => <span className="font-medium text-text-primary">{k.name}</span> },
    {
      key: "prefix",
      label: "Key",
      render: (k) => (
        <code className="rounded bg-black/5 px-2 py-0.5 text-xs font-mono text-text-secondary">
          {k.prefix}...{k.revoked && " (revoked)"}
        </code>
      ),
    },
    {
      key: "scopes",
      label: "Scopes",
      render: (k) => (
        <div className="flex flex-wrap gap-1">
          {k.scopes.map((s) => (
            <Badge key={s} variant={(scopeColors[s] || "default") as "info" | "success" | "warning"} size="sm">
              {s}
            </Badge>
          ))}
        </div>
      ),
    },
    { key: "created", label: "Created", render: (k) => formatDate(k.created) },
    { key: "lastUsed", label: "Last Used", render: (k) => k.lastUsed ? formatDate(k.lastUsed) : <span className="text-text-muted">Never</span> },
    {
      key: "actions",
      label: "",
      render: (k) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => addToast("Key copied!", "success")} icon={<Copy className="h-3.5 w-3.5" />} />
          {!k.revoked && (
            <Button variant="ghost" size="sm" onClick={() => setShowRevoke(k.id)} icon={<Trash2 className="h-3.5 w-3.5 text-error" />} />
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">API Keys</h1>
          <p className="mt-1 text-sm text-text-muted">Manage API keys for programmatic access</p>
        </div>
        <Button onClick={() => setShowGenerate(true)} icon={<Plus className="h-4 w-4" />}>
          Generate New Key
        </Button>
      </div>

      {keys.length === 0 ? (
        <EmptyState
          icon={<Key className="h-8 w-8" />}
          title="No API keys yet"
          description="Generate your first API key to get started."
          action={
            <Button onClick={() => setShowGenerate(true)} icon={<Plus className="h-4 w-4" />}>
              Generate New Key
            </Button>
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={keys}
          keyExtractor={(k) => k.id}
        />
      )}

      <Modal open={showGenerate} onClose={() => setShowGenerate(false)} title="Generate New API Key">
        <div className="space-y-4">
          <Input
            label="Key Name"
            placeholder="e.g. Production SDK"
            value={newKeyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewKeyName(e.target.value)}
          />
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-secondary">Scopes</p>
            {["push:send", "subscribers:read", "analytics:read"].map((scope) => (
              <label key={scope} className="flex items-center gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={newKeyScopes.includes(scope)}
                  onChange={() => toggleScope(scope)}
                  className="rounded border-border bg-background"
                />
                {scope}
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowGenerate(false)}>Cancel</Button>
            <Button onClick={handleGenerate} loading={generating}>Generate</Button>
          </div>
        </div>
      </Modal>

      <Modal open={!!showKeyValue} onClose={() => setShowKeyValue(false)} title="Your API Key" size="sm">
        <div className="space-y-4">
          <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
            <AlertTriangle className="mr-2 inline h-4 w-4" />
            This is your only chance to copy this key. It will not be shown again.
          </div>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3 text-sm font-mono text-text-primary">
              {generatedKeyValue}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => {
                navigator.clipboard.writeText(generatedKeyValue);
                addToast("Key copied!", "success");
              }}
              icon={<Copy className="h-3.5 w-3.5" />}
            />
          </div>
          <Button className="w-full" onClick={() => setShowKeyValue(false)}>
            I&apos;ve Saved the Key
          </Button>
        </div>
      </Modal>

      <Modal open={!!showRevoke} onClose={() => setShowRevoke(null)} title="Revoke API Key" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to revoke this API key? This action cannot be undone.
            Any services using this key will immediately lose access.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowRevoke(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleRevoke(showRevoke!)}>
              Revoke Key
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
