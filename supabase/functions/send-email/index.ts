import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_API_URL = "https://api.resend.com/emails";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    return new Response("Missing RESEND_API_KEY", { status: 500, headers: corsHeaders });
  }

  const payload = await req.json().catch(() => null);
  const { to, subject, html } = payload || {};
  if (!to || !subject || !html) {
    return new Response("Missing fields", { status: 400, headers: corsHeaders });
  }

  const resendRes = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "zainabusal113@gmail.com",
      to,
      subject,
      html,
    }),
  });

  if (!resendRes.ok) {
    const text = await resendRes.text();
    return new Response(text, { status: resendRes.status, headers: corsHeaders });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    status: 200,
  });
});
