import { supabase } from "@/integrations/supabase/client";

interface LogPayload {
  action: string;
  details?: string;
  userId?: string;
}

export const logActivity = async ({ action, details, userId }: LogPayload) => {
  try {
    await supabase.from("activity_logs").insert({
      user_id: userId || null,
      action,
      details,
    });
  } catch (err) {
    // Silently ignore to avoid blocking UX; logging is best-effort.
    console.error("Failed to log activity", err);
  }
};
