"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/domain/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  UserPlus,
  Shield,
  Clock,
  Mail,
  Users,
  Loader2,
} from "lucide-react";

type Role = "owner" | "admin" | "member";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "pending";
  joinedAt: string;
}

interface PendingInvite {
  email: string;
  role: string;
  invitedAt: string;
}

const roles: { value: Role; label: string }[] = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
];

const roleVariant = (r: Role) =>
  ({ owner: "primary", admin: "info", member: "default" } as const)[r];

export default function TeamPage() {
  const { addToast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("member");
  const [inviting, setInviting] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<TeamMember | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/team/members");
        const json = await res.json();
        if (json.success) {
          setMembers(json.data.members ?? json.data ?? []);
          setPendingInvites(json.data.pending_invites ?? []);
        }
      } catch {
        addToast("Failed to load team members", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const handleInvite = async () => {
    if (!inviteEmail) {
      addToast("Please enter an email address", "error");
      return;
    }
    setInviting(true);
    try {
      const res = await fetch("/api/v1/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Invitation sent to ${inviteEmail}!`, "success");
        setShowInvite(false);
        setInviteEmail("");
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to send invitation", "error");
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/v1/team/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Role updated to ${newRole}`, "success");
        setMembers((prev) =>
          prev.map((m) => (m.id === memberId ? { ...m, role: newRole as Role } : m))
        );
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to update role", "error");
    }
  };

  const handleRemoveMember = async () => {
    if (!confirmRemove) return;
    const memberId = confirmRemove.id;
    setConfirmRemove(null);
    try {
      const res = await fetch(`/api/v1/team/members/${memberId}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        addToast("Member removed", "success");
        setMembers((prev) => prev.filter((m) => m.id !== memberId));
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to remove member", "error");
    }
  };

  const columns: Column<TeamMember>[] = [
    {
      key: "name",
      label: "Member",
      render: (m) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            {m.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{m.name}</p>
            <p className="text-xs text-text-muted">{m.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (m) => (
        <Select
          options={roles}
          value={m.role}
          onChange={(v) => handleRoleChange(m.id, v)}
          className="w-28"
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (m) => <Badge variant={m.status === "active" ? "success" : "warning"} size="sm">{m.status}</Badge>,
    },
    {
      key: "actions",
      label: "",
      render: (m) =>
        m.role !== "owner" ? (
          <Button variant="ghost" size="sm" onClick={() => setConfirmRemove(m)}>
            Remove
          </Button>
        ) : null,
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
          <h1 className="text-2xl font-bold text-text-primary">Team</h1>
          <p className="mt-1 text-sm text-text-muted">Manage your team members and invitations</p>
        </div>
        <Button onClick={() => setShowInvite(true)} icon={<UserPlus className="h-4 w-4" />}>
          Invite Member
        </Button>
      </div>

      {members.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No team members yet"
          description="Invite your team to collaborate."
          action={
            <Button onClick={() => setShowInvite(true)} icon={<UserPlus className="h-4 w-4" />}>
              Invite Member
            </Button>
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={members}
          keyExtractor={(m) => m.id}
        />
      )}

      {pendingInvites.length > 0 && (
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <h3 className="text-sm font-medium text-text-primary">Pending Invites</h3>
            </div>
            <div className="divide-y divide-border">
              {pendingInvites.map((invite) => (
                <div key={invite.email} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-text-muted" />
                    <div>
                      <p className="text-sm text-text-primary">{invite.email}</p>
                      <p className="text-xs text-text-muted">
                        {invite.role} · Invited {formatDate(invite.invitedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => addToast("Invite resent", "success")}>
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => addToast("Invite cancelled", "info")}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Modal open={showInvite} onClose={() => setShowInvite(false)} title="Invite Team Member">
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteEmail(e.target.value)}
          />
          <Select
            label="Role"
            options={roles}
            value={inviteRole}
            onChange={(v) => setInviteRole(v as Role)}
          />
          <p className="text-xs text-text-muted">They will receive an email with instructions to join your workspace.</p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
            <Button onClick={handleInvite} loading={inviting}>Send Invitation</Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={confirmRemove !== null}
        onClose={() => setConfirmRemove(null)}
        title="Remove Member"
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to remove <span className="font-medium text-text-primary">{confirmRemove?.name}</span> from the team? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setConfirmRemove(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveMember}>Remove</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
