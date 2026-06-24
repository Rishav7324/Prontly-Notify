"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  UserPlus,
  Shield,
  Clock,
  MoreHorizontal,
  Mail,
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

const roles: { value: Role; label: string }[] = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
];

const mockMembers: TeamMember[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "owner", status: "active", joinedAt: "2026-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active", joinedAt: "2026-03-20" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "member", status: "active", joinedAt: "2026-05-10" },
];

const pendingInvites = [
  { email: "alice@example.com", role: "member", invitedAt: "2026-06-21" },
  { email: "charlie@example.com", role: "admin", invitedAt: "2026-06-22" },
];

const roleVariant = (r: Role) =>
  ({ owner: "primary", admin: "info", member: "default" } as const)[r];

export default function TeamPage() {
  const { addToast } = useToast();
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("member");

  const handleInvite = () => {
    if (!inviteEmail) {
      addToast("Please enter an email address", "error");
      return;
    }
    addToast(`Invitation sent to ${inviteEmail}!`, "success");
    setShowInvite(false);
    setInviteEmail("");
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
          onChange={(v) => addToast(`Role updated to ${v}`, "success")}
          className="w-28"
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (m) => <Badge variant={m.status === "active" ? "success" : "warning"} size="sm">{m.status}</Badge>,
    },
  ];

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

      <DataTable
        columns={columns}
        data={mockMembers}
        keyExtractor={(m) => m.id}
      />

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
            <Button onClick={handleInvite}>Send Invitation</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
