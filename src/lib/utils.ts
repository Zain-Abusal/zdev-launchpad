import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from '@/integrations/supabase/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function logActivity(action: string, details: string, userId: string, userEmail?: string) {
  let ip = '';
  let location = '';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
    // Fetch geolocation from IP
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    location = `${geoData.city || ''}, ${geoData.region || ''}, ${geoData.country_name || ''}`;
  } catch {}
  await supabase.from('activity_logs').insert({
    action,
    details: `${details} | IP: ${ip} | Location: ${location} | Email: ${userEmail || ''}`,
    user_id: userId,
    created_at: new Date().toISOString(),
  });
}
