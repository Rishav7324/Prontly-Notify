"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  Key,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle2,
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

const mockKeys: ApiKey[] = [
  { id: "1", name: "Production SDK", prefix: "pk_prod_a1b2", scopes: ["push:send", "subscribers:read"], created: "2026-01-15", lastUsed: "2026-06-22", revoked: false },
  { id: "2", name: "Staging Testing", prefix: "pk_test_c3d4", scopes: ["push:send"], created: "2026-03-20", lastUsed: "2026-06-18", revoked: false },
  { id: "3", name: "Analytics Export", prefix: "pk_prod_e5f6", scopes: ["analytics:read"], created: "2026-04-10", lastUsed: null, revoked: true },
];

const scopeColors: Record<string, string> = {
  "push:send": "info",
  "subscribers:read": "success",
  "analytics:read": "warning",
};

export default function ApiKeysPage() {
  const { addToast } = useToast();
  const [showGenerate, setShowGenerate] = useState(false);
  const [showRevoke, setShowRevoke] = useState<string | null>(null);
  const [showKeyValue, setShowKeyValue] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");

  const handleGenerate = () => {
    if (!newKeyName) {
      addToast("Please enter a key name", "error");
      return;
    }
    setShowGenerate(false);
    setShowKeyValue(true);
    setNewKeyName("");
  };

  const handleRevoke = (id: string) => {
    addToast("API key revoked", "success");
    setShowRevoke(null);
  };

  const columns: Column<ApiKey>[] = [
    { key: "name", label: "Name", render: (k) => <span className="font-medium text-text-primary">{k.name}</span> },
    {
      key: "prefix",
      label: "Key",
      render: (k) => (
        <code className="rounded bg-white/5 px-2 py-0.5 text-xs font-mono text-text-secondary">
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

      <DataTable
        columns={columns}
        data={mockKeys}
        keyExtractor={(k) => k.id}
      />

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
                <input type="checkbox" defaultChecked className="rounded border-border bg-background" />
                {scope}
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowGenerate(false)}>Cancel</Button>
            <Button onClick={handleGenerate}>Generate</Button>
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
              pk_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => addToast("Key copied!", "success")}
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
