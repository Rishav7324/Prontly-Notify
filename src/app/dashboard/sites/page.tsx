"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { formatNumber } from "@/lib/utils";
import { Globe, Plus, ExternalLink, Users } from "lucide-react";

interface Website {
  id: string;
  name: string;
  domain: string;
  subscribers: number;
  status: "active" | "inactive" | "unverified";
  favicon?: string;
}

const mockSites: Website[] = [
  { id: "1", name: "My Blog", domain: "myblog.com", subscribers: 8450, status: "active" },
  { id: "2", name: "Shopify Store", domain: "shop.mystore.com", subscribers: 3200, status: "active" },
];

export default function SitesPage() {
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [sites] = useState<Website[]>(mockSites);
  const [newSite, setNewSite] = useState({ name: "", domain: "" });

  const handleAddSite = () => {
    if (!newSite.name || !newSite.domain) {
      addToast("Please fill in all fields", "error");
      return;
    }
    addToast(`Website "${newSite.name}" added successfully!`, "success");
    setShowAddModal(false);
    setNewSite({ name: "", domain: "" });
  };

  const statusVariant = (s: Website["status"]) =>
    ({ active: "success", inactive: "default", unverified: "warning" } as const)[s];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Your Websites</h1>
          <p className="mt-1 text-sm text-text-muted">Manage your connected websites</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={<Plus className="h-4 w-4" />}>
          Add Website
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Usage</span>
            <span className="text-sm text-text-muted">Using {sites.length} of 3 sites on Growth plan</span>
          </div>
          <ProgressBar value={sites.length} max={3} className="mt-2" showLabel />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id} variant="interactive">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                    {site.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{site.name}</p>
                    <p className="flex items-center gap-1 text-xs text-text-muted">
                      <Globe className="h-3 w-3" />
                      {site.domain}
                    </p>
                  </div>
                </div>
                <Badge variant={statusVariant(site.status)} size="sm">
                  {site.status}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
                <Users className="h-4 w-4" />
                <span>{formatNumber(site.subscribers)} subscribers</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" icon={<ExternalLink className="h-3 w-3" />}>
                  View
                </Button>
                <Button variant="ghost" size="sm">Settings</Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <button
          onClick={() => setShowAddModal(true)}
          className="flex min-h-[180px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/50 p-6 text-center transition-colors hover:border-primary/50 hover:bg-surface"
        >
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-text-primary">Add New Website</p>
            <p className="mt-1 text-xs text-text-muted">Connect a new domain</p>
          </div>
        </button>
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Website">
        <div className="space-y-4">
          <Input label="Website Name" placeholder="My Blog" value={newSite.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSite({ ...newSite, name: e.target.value })} />
          <Input label="Domain" placeholder="example.com" value={newSite.domain} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSite({ ...newSite, domain: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAddSite}>Add Website</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
