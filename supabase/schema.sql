-- Failsafe SaaS Platform Schema: All referenced tables

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  slug TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  theme TEXT DEFAULT 'system',
  smtp_host TEXT,
  smtp_user TEXT,
  smtp_pass TEXT,
  deployment TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  image_url TEXT,
  demo_url TEXT,
  tech_stack TEXT[],
  type TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT,
  contact_email TEXT NOT NULL,
  status TEXT,
  user_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

-- Licenses
CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key TEXT NOT NULL,
  client_project_id UUID,
  status TEXT,
  max_domains INT,
                                                                                                                              expires_at TIMESTAMP,
                                                                                                                              created_at TIMESTAMP DEFAULT now(),
                                                                                                                              updated_at TIMESTAMP,
  FOREIGN KEY (client_project_id) REFERENCES client_projects(id)
);

-- License Logs
CREATE TABLE IF NOT EXISTS license_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID,
  domain TEXT,
  created_at TIMESTAMP DEFAULT now(),
  last_checked TIMESTAMP,
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- License Events
CREATE TABLE IF NOT EXISTS license_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID,
  event_type TEXT,
  domain TEXT,
  error_code TEXT,
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- License Domains
CREATE TABLE IF NOT EXISTS license_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID,
  domain TEXT,
  first_seen TIMESTAMP,
  last_seen TIMESTAMP,
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- Client Projects
CREATE TABLE IF NOT EXISTS client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  project_id UUID,
  license_key TEXT,
  private_notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  subject TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Ticket Messages
CREATE TABLE IF NOT EXISTS ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID,
  sender_id UUID,
  message TEXT,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(id)
);

-- Ticket Attachments
CREATE TABLE IF NOT EXISTS ticket_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID,
  file_url TEXT,
  uploaded_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(id)
);

-- Billing
CREATE TABLE IF NOT EXISTS billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  amount NUMERIC,
  currency TEXT,
  status TEXT,
  invoice_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT,
  details TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Portfolio
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  image_url TEXT,
  demo_url TEXT,
  tech_stack TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

-- Downloads
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  project_id UUID,
  file_url TEXT,
  downloaded_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Docs (for legal pages and documentation)
CREATE TABLE IF NOT EXISTS docs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  category TEXT,
  is_public BOOLEAN DEFAULT true,
  order_index INT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

-- Chat Messages (Support)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID,
  sender_email TEXT,
  sender_name TEXT,
  is_from_client BOOLEAN,
  message TEXT,
  project_id UUID,
  license_id UUID,
  status TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);
-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  slug TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  theme TEXT DEFAULT 'system',
  smtp_host TEXT,
  smtp_user TEXT,
  smtp_pass TEXT,
  deployment TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- License Logs
CREATE TABLE IF NOT EXISTS license_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID,
  domain TEXT,
  created_at TIMESTAMP DEFAULT now(),
  last_checked TIMESTAMP,
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- License Events
CREATE TABLE IF NOT EXISTS license_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID,
  event_type TEXT,
  domain TEXT,
  error_code TEXT,
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- License Domains
CREATE TABLE IF NOT EXISTS license_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID,
  domain TEXT,
  first_seen TIMESTAMP,
  last_seen TIMESTAMP,
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- Support Messages (Chat)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID,
  sender_email TEXT,
  sender_name TEXT,
  is_from_client BOOLEAN,
  message TEXT,
  project_id UUID,
  license_id UUID,
  status TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

-- Legal Pages (docs table used for legal content)
-- Add rows with slug: 'tos', 'privacy', 'gdpr' and content field for each legal page.
