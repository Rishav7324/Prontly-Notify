"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  User,
  Shield,
  Bell,
  Building2,
  Camera,
  Smartphone,
  LogOut,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

const settingsTabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "workspace", label: "Workspace" },
];

const timezones = [
  { value: "asia/kolkata", label: "Asia/Kolkata (IST)" },
  { value: "america/new_york", label: "America/New_York (EST)" },
  { value: "europe/london", label: "Europe/London (GMT)" },
  { value: "pacific/auckland", label: "Pacific/Auckland (NZST)" },
];

export default function SettingsPage() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [timezone, setTimezone] = useState("asia/kolkata");
  const [twoFA, setTwoFA] = useState(false);
  const [notifications, setNotifications] = useState({
    campaignSent: true,
    subscriberMilestone: false,
    weeklyReport: true,
    billingAlerts: true,
    teamInvites: true,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/users/me");
        const json = await res.json();
        if (json.success) {
          const u = json.data.user;
          setName(u.name ?? "");
          setEmail(u.email ?? "");
          setAvatar(u.avatar_url ?? "");
          setWorkspaceName(json.data.workspaces?.[0]?.name ?? "");
          setTimezone(json.data.workspaces?.[0]?.default_timezone ?? "asia/kolkata");
          setTwoFA(u.two_factor_enabled ?? false);
          if (u.notification_prefs) {
            setNotifications((prev) => ({ ...prev, ...JSON.parse(u.notification_prefs) }));
          }
        }
      } catch {
        addToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const json = await res.json();
      if (json.success) addToast("Profile updated!", "success");
      else addToast(json.error, "error");
    } catch {
      addToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveWorkspace = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspace_name: workspaceName, timezone }),
      });
      const json = await res.json();
      if (json.success) addToast("Workspace settings saved!", "success");
      else addToast(json.error, "error");
    } catch {
      addToast("Failed to save workspace settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notification_preferences: notifications }),
      });
      const json = await res.json();
      if (json.success) addToast("Notification preferences saved!", "success");
      else addToast(json.error, "error");
    } catch {
      addToast("Failed to save notification preferences", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="space-y-4">
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="mt-1 text-sm text-text-muted">Manage your account and workspace preferences</p>
      </div>

      <Tabs tabs={settingsTabs} activeTab={tab} onChange={setTab} />

      {tab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-xl font-bold text-primary">
                  {avatar ? (
                    <img src={avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
                  ) : (
                    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "U"
                  )}
                </div>
                <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div>
                <p className="font-medium text-text-primary">{name || "User"}</p>
                <p className="text-sm text-text-muted">{email}</p>
              </div>
            </div>
            <Input label="Full Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} loading={saving}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "security" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Current Password" type="password" placeholder="Enter current password" />
              <Input label="New Password" type="password" placeholder="Enter new password" />
              <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
              <div className="flex justify-end">
                <Button onClick={() => addToast("Password changed!", "success")}>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">2FA</p>
                  <p className="text-xs text-text-muted">Add an extra layer of security to your account</p>
                </div>
                <Toggle checked={twoFA} onChange={setTwoFA} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-text-muted" />
                    <div>
                      <p className="text-sm text-text-primary">
                        Current Session
                        <Badge variant="success" size="sm" className="ml-2">Current</Badge>
                      </p>
                      <p className="text-xs text-text-muted">Active now</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  </p>
                  <p className="text-xs text-text-muted">
                    {key === "campaignSent" && "When a campaign is sent"}
                    {key === "subscriberMilestone" && "When you reach a subscriber milestone"}
                    {key === "weeklyReport" && "Weekly performance summary"}
                    {key === "billingAlerts" && "Payment failures and invoice updates"}
                    {key === "teamInvites" && "When team members are invited"}
                  </p>
                </div>
                <Toggle
                  checked={val}
                  onChange={(v) => setNotifications((prev) => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveNotifications} loading={saving}>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "workspace" && (
        <Card>
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Workspace Name"
              value={workspaceName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkspaceName(e.target.value)}
            />
            <Select
              label="Timezone"
              options={timezones}
              value={timezone}
              onChange={setTimezone}
            />
            <div className="flex justify-end pt-2">
              <Button onClick={handleSaveWorkspace} loading={saving}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
