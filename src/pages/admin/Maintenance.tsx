import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertTriangle, Save, RefreshCw, ShieldCheck, Clock4 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const retry = async <T,>(fn: () => Promise<T>, attempts = 3, delayMs = 400): Promise<T> => {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      await new Promise((res) => setTimeout(res, delayMs * (i + 1)));
    }
  }
  throw lastErr;
};

const AdminMaintenance = () => {
  const [enabled, setEnabled] = useState(false);
  const [banner, setBanner] = useState("Scheduled maintenance at 2 AM UTC.");
  const [notes, setNotes] = useState("Expected downtime: 15 minutes.");
  const defaults = {
    enabled: false,
    banner: "Scheduled maintenance at 2 AM UTC.",
    notes: "Expected downtime: 15 minutes.",
  };

  const handleReset = () => {
    setEnabled(defaults.enabled);
    setBanner(defaults.banner);
    setNotes(defaults.notes);
  };

  const { toast } = useToast();

  useEffect(() => {
    // Load latest maintenance settings
    const loadSettings = async () => {
      const { data } = await retry(() =>
        supabase.from("maintenance_settings").select("*").eq("id", 1).single()
      );
      if (data) {
        setEnabled(!!data.enabled);
        setBanner(data.banner || defaults.banner);
        setNotes(data.notes || defaults.notes);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    const { error } = await retry(() =>
      supabase
        .from("maintenance_settings")
        .upsert({ id: 1, enabled, banner, notes, updated_at: new Date().toISOString() })
    );
    if (error) {
      toast({ title: "Save failed", description: "Could not update maintenance settings.", variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Maintenance settings updated." });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-r from-primary/15 via-secondary/70 to-background p-6"
        >
          <p className="pill w-fit">Maintenance</p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">Maintenance mode</h1>
          <p className="text-muted-foreground">
            Toggle site availability, set clear messaging, and coordinate safe downtime windows.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={enabled ? "destructive" : "secondary"} className="rounded-full">
              {enabled ? "Maintenance enabled" : "Maintenance disabled"}
            </Badge>
            <Badge variant="secondary" className="rounded-full border-primary/30 bg-primary/10 text-primary">
              Banner preview: {banner.slice(0, 40)}
              {banner.length > 40 ? "..." : ""}
            </Badge>
          </div>
        </motion.div>

        <Card className="surface-card border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Maintenance controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-secondary/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Enable maintenance mode</p>
                <p className="text-xs text-muted-foreground">Show banner and limit access for non-admin users.</p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Banner message</label>
                <Input value={banner} onChange={(e) => setBanner(e.target.value)} className="bg-secondary/70" placeholder="What users will see" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Notes</label>
                <Textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-secondary/70"
                  placeholder="Planned work, expected downtime, and contact channel"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/80 p-3">
                <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Safe rollout</p>
                  <p className="text-xs text-muted-foreground">
                    Applies soft-locks for non-admins while keeping admin preview available.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/80 p-3">
                <Clock4 className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Communicate timing</p>
                  <p className="text-xs text-muted-foreground">
                    Banner and notes stay in sync so stakeholders know what to expect.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1 border-border/60 text-foreground" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMaintenance;
