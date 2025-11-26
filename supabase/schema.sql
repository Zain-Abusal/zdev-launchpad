CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE users (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           citext UNIQUE NOT NULL,
  password_hash   text NOT NULL,
  name            text NOT NULL,
  avatar_url      text,
  is_active       boolean NOT NULL DEFAULT true,
  is_staff        boolean NOT NULL DEFAULT false,
  staff_role      text,
  last_login_at   timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organizations (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            text NOT NULL,
  slug            text UNIQUE NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organization_members (
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role            text NOT NULL DEFAULT 'org_member',
  created_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, user_id)
);

CREATE TABLE apps (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            text NOT NULL,
  slug            text NOT NULL,
  description     text,
  status          text NOT NULL DEFAULT 'sandbox',
  default_rate_limit_per_min integer DEFAULT 60,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, slug)
);

CREATE INDEX idx_apps_org ON apps (organization_id);

CREATE TABLE api_keys (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         uuid REFERENCES users(id) ON DELETE SET NULL,
  app_id          uuid REFERENCES apps(id) ON DELETE SET NULL,
  name            text NOT NULL,
  key_prefix      text NOT NULL,
  key_hash        text NOT NULL,
  scopes          text[] NOT NULL,
  status          text NOT NULL DEFAULT 'active',
  expires_at      timestamptz,
  last_used_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_api_keys_org ON api_keys (organization_id);
CREATE INDEX idx_api_keys_prefix ON api_keys (key_prefix);
CREATE INDEX idx_api_keys_status ON api_keys (status);

CREATE TABLE plans (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            text NOT NULL,
  slug            text UNIQUE NOT NULL,
  monthly_price_cents integer NOT NULL,
  request_limit_per_month integer,
  features        text[] NOT NULL,
  is_active       boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE subscriptions (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id         uuid NOT NULL REFERENCES plans(id),
  status          text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end   timestamptz NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  external_customer_id text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE invoices (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount_cents    integer NOT NULL,
  currency        text NOT NULL DEFAULT 'usd',
  status          text NOT NULL,
  billing_period_start timestamptz NOT NULL,
  billing_period_end   timestamptz NOT NULL,
  external_invoice_id  text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE request_logs (
  id              bigserial PRIMARY KEY,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  app_id          uuid REFERENCES apps(id) ON DELETE SET NULL,
  api_key_id      uuid REFERENCES api_keys(id) ON DELETE SET NULL,
  path            text NOT NULL,
  method          text NOT NULL,
  status_code     integer NOT NULL,
  latency_ms      integer NOT NULL,
  ip_address      inet,
  user_agent      text,
  occurred_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_request_logs_org_time ON request_logs (organization_id, occurred_at);
CREATE INDEX idx_request_logs_status ON request_logs (status_code);

CREATE TABLE metrics_events (
  id              bigserial PRIMARY KEY,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  app_id          uuid REFERENCES apps(id) ON DELETE SET NULL,
  metric_type     text NOT NULL,
  value           numeric NOT NULL,
  occurred_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_metrics_type_time ON metrics_events (metric_type, occurred_at);

CREATE TABLE audit_logs (
  id              bigserial PRIMARY KEY,
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  actor_user_id   uuid REFERENCES users(id) ON DELETE SET NULL,
  actor_api_key_id uuid REFERENCES api_keys(id) ON DELETE SET NULL,
  action          text NOT NULL,
  resource_type   text NOT NULL,
  resource_id     text,
  metadata        jsonb,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_org_time ON audit_logs (organization_id, created_at);

CREATE TABLE blog_posts (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  excerpt         text,
  content_md      text NOT NULL,
  author_id       uuid REFERENCES users(id) ON DELETE SET NULL,
  tags            text[],
  published_at    timestamptz,
  is_published    boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE support_tickets (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  user_id         uuid REFERENCES users(id) ON DELETE SET NULL,
  name            text,
  email           text NOT NULL,
  subject         text NOT NULL,
  message         text NOT NULL,
  category        text NOT NULL,
  status          text NOT NULL DEFAULT 'open',
  internal_notes  text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE status_incidents (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           text NOT NULL,
  description     text NOT NULL,
  status          text NOT NULL,
  impact          text NOT NULL,
  started_at      timestamptz NOT NULL,
  resolved_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type            text NOT NULL,
  payload         jsonb NOT NULL,
  read_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organization_settings (
  organization_id uuid PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
  billing_email   text,
  timezone        text DEFAULT 'UTC',
  locale          text DEFAULT 'en',
  theme           text DEFAULT 'system',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE platform_settings (
  id              int PRIMARY KEY DEFAULT 1,
  brand_name      text NOT NULL DEFAULT 'My API Platform',
  support_email   text,
  docs_url        text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
