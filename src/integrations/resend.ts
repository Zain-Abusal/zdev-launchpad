import { supabase } from "@/integrations/supabase/client";

export async function sendResendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const { data, error } = await supabase.functions.invoke("send-email", {
    body: { to, subject, html },
  });
  if (error) throw error;
  return data;
}
