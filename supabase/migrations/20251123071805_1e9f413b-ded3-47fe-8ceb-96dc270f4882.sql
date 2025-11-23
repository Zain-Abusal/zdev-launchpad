-- Create storage buckets for images and files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-images', 'project-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('project-files', 'project-files', false, 52428800, ARRAY['application/pdf', 'application/zip', 'application/x-zip-compressed']);

-- Storage policies for project images (public bucket)
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' 
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Storage policies for project files (private bucket)
CREATE POLICY "Clients can view their project files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'project-files'
  AND (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
    OR
    EXISTS (
      SELECT 1 FROM client_projects cp
      JOIN clients c ON c.id = cp.client_id
      WHERE c.user_id = auth.uid()
      AND (storage.foldername(name))[1] = cp.project_id::text
    )
  )
);

CREATE POLICY "Admins can upload project files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-files'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update project files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-files'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can delete project files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-files'
  AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Add images column to portfolio table
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS images TEXT[];

-- Add type and demo_link to portfolio to support demos
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'portfolio';
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS demo_link TEXT;

-- Enable RLS on all tables
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for activity_logs
CREATE POLICY "Admins can view all activity logs"
ON activity_logs FOR SELECT
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can view their own activity logs"
ON activity_logs FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "System can insert activity logs"
ON activity_logs FOR INSERT
WITH CHECK (true);

-- RLS Policies for announcements
CREATE POLICY "Anyone can view active announcements"
ON announcements FOR SELECT
USING (active = true);

CREATE POLICY "Admins can manage announcements"
ON announcements FOR ALL
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS Policies for billing
CREATE POLICY "Admins can view all billing"
ON billing FOR SELECT
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Clients can view their own billing"
ON billing FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM clients c
    WHERE c.id = billing.client_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage billing"
ON billing FOR ALL
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS Policies for portfolio
CREATE POLICY "Anyone can view featured portfolio items"
ON portfolio FOR SELECT
USING (featured = true OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can manage portfolio"
ON portfolio FOR ALL
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS Policies for settings
CREATE POLICY "Anyone can view settings"
ON settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage settings"
ON settings FOR ALL
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- RLS Policies for support tickets
CREATE POLICY "Admins can view all tickets"
ON support_tickets FOR SELECT
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Clients can view their own tickets"
ON support_tickets FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM clients c
    WHERE c.id = support_tickets.client_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage tickets"
ON support_tickets FOR ALL
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Clients can create tickets"
ON support_tickets FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM clients c
    WHERE c.id = support_tickets.client_id
    AND c.user_id = auth.uid()
  )
);

-- RLS Policies for ticket messages and attachments
CREATE POLICY "Ticket participants can view messages"
ON ticket_messages FOR SELECT
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  OR
  EXISTS (
    SELECT 1 FROM support_tickets st
    JOIN clients c ON c.id = st.client_id
    WHERE st.id = ticket_messages.ticket_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Ticket participants can send messages"
ON ticket_messages FOR INSERT
WITH CHECK (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  OR
  EXISTS (
    SELECT 1 FROM support_tickets st
    JOIN clients c ON c.id = st.client_id
    WHERE st.id = ticket_messages.ticket_id
    AND c.user_id = auth.uid()
  )
);

-- RLS Policies for downloads
CREATE POLICY "Admins can view all downloads"
ON downloads FOR SELECT
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Clients can view their own downloads"
ON downloads FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM clients c
    WHERE c.id = downloads.client_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "System can log downloads"
ON downloads FOR INSERT
WITH CHECK (true);

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_details TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO activity_logs (user_id, action, details)
  VALUES (p_user_id, p_action, p_details)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;