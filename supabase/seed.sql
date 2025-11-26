-- Seed data for API platform
INSERT INTO users (id, email, password_hash, name, is_staff, staff_role) VALUES
  ('00000000-0000-0000-0000-000000000001','admin@example.com','hash','Admin User',true,'staff_admin'),
  ('00000000-0000-0000-0000-000000000002','support@example.com','hash','Support User',true,'staff_support'),
  ('00000000-0000-0000-0000-000000000003','user@example.com','hash','Demo User',false,NULL)
ON CONFLICT (email) DO NOTHING;

INSERT INTO organizations (id,name,slug) VALUES
  ('10000000-0000-0000-0000-000000000001','Acme Corp','acme'),
  ('10000000-0000-0000-0000-000000000002','Globex','globex')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO organization_members (organization_id,user_id,role) VALUES
  ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','org_owner'),
  ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','org_admin'),
  ('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002','org_owner'),
  ('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000003','org_member')
ON CONFLICT DO NOTHING;

INSERT INTO apps (id,organization_id,name,slug,status,default_rate_limit_per_min) VALUES
  ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Acme Sandbox','acme-sandbox','sandbox',120),
  ('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','Acme Live','acme-live','live',300),
  ('20000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000002','Globex Payments','globex-pay','live',200)
ON CONFLICT DO NOTHING;

INSERT INTO plans (id,name,slug,monthly_price_cents,request_limit_per_month,features) VALUES
  ('30000000-0000-0000-0000-000000000001','Free','free',0,100000,ARRAY['Community support','Shared infrastructure']),
  ('30000000-0000-0000-0000-000000000002','Pro','pro',4900,1000000,ARRAY['Priority support','Higher limits','Audit logs']),
  ('30000000-0000-0000-0000-000000000003','Enterprise','enterprise',0,NULL,ARRAY['Custom SLAs','Dedicated support','SAML/SCIM'])
ON CONFLICT DO NOTHING;

INSERT INTO subscriptions (id,organization_id,plan_id,status,current_period_start,current_period_end,cancel_at_period_end)
VALUES
  ('40000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000002','active', now() - interval '15 days', now() + interval '15 days', false),
  ('40000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','30000000-0000-0000-0000-000000000003','trialing', now() - interval '10 days', now() + interval '20 days', false)
ON CONFLICT DO NOTHING;

INSERT INTO invoices (id,organization_id,subscription_id,amount_cents,status,billing_period_start,billing_period_end)
VALUES
  ('50000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001',4900,'paid',now()-interval '40 days',now()-interval '10 days'),
  ('50000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000002',19900,'open',now()-interval '20 days',now()+interval '10 days')
ON CONFLICT DO NOTHING;

INSERT INTO api_keys (id,organization_id,user_id,app_id,name,key_prefix,key_hash,scopes,status,expires_at)
VALUES
  ('60000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000001','Acme Sandbox Key','sk_live_acme','hash_read',ARRAY['read'],'active',now()+interval '90 days'),
  ('60000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000002','Acme Live Key','sk_live_acme2','hash_full',ARRAY['read','write'],'active',now()+interval '120 days'),
  ('60000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000003','Globex Key','sk_live_globex','hash_admin',ARRAY['admin'],'active',now()+interval '60 days')
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (id,slug,title,excerpt,content_md,author_id,tags,is_published,published_at)
VALUES
  ('70000000-0000-0000-0000-000000000001','launch','Launching our API platform','Kickoff announcement','## Launch\nOur platform is live.', '00000000-0000-0000-0000-000000000001',ARRAY['launch','product'],true,now()-interval '15 days'),
  ('70000000-0000-0000-0000-000000000002','roadmap','2024 Roadmap','What is coming','## Roadmap\nMore endpoints coming soon.', '00000000-0000-0000-0000-000000000002',ARRAY['roadmap'],true,now()-interval '7 days'),
  ('70000000-0000-0000-0000-000000000003','security','Security first','Our approach to security','## Security\nWe hash keys and use RBAC.', '00000000-0000-0000-0000-000000000003',ARRAY['security'],true,now()-interval '3 days')
ON CONFLICT DO NOTHING;

INSERT INTO support_tickets (id,organization_id,user_id,name,email,subject,message,category,status)
VALUES
  ('80000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','Demo User','user@example.com','Need more quota','Can we raise the limit?','support','open'),
  ('80000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002','Support User','support@example.com','Enterprise request','Looking for enterprise plan','sales','in_progress')
ON CONFLICT DO NOTHING;

INSERT INTO status_incidents (id,title,description,status,impact,started_at,resolved_at)
VALUES
  ('90000000-0000-0000-0000-000000000001','Database maintenance','Routine maintenance window','monitoring','minor',now()-interval '1 day',now()-interval '20 hours'),
  ('90000000-0000-0000-0000-000000000002','API latency spike','Investigating elevated latency','investigating','major',now()-interval '2 hours',NULL)
ON CONFLICT DO NOTHING;

INSERT INTO platform_settings (id,brand_name,support_email,docs_url)
VALUES (1,'Launchpad API','support@example.com','https://docs.example.com')
ON CONFLICT (id) DO NOTHING;

-- metrics and logs
DO $$
DECLARE
  day_offset integer;
BEGIN
  FOR day_offset IN 0..29 LOOP
    INSERT INTO metrics_events (organization_id,app_id,metric_type,value,occurred_at)
    SELECT '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'request', (200 + (random()*100))::int, now() - (day_offset || ' days')::interval
    UNION ALL
    SELECT '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'request', (300 + (random()*150))::int, now() - (day_offset || ' days')::interval
    UNION ALL
    SELECT '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', 'request', (250 + (random()*120))::int, now() - (day_offset || ' days')::interval;
  END LOOP;
END $$;

INSERT INTO audit_logs (organization_id,actor_user_id,action,resource_type,resource_id,metadata)
VALUES
  ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','api_key.created','api_key','60000000-0000-0000-0000-000000000002','{"name":"Acme Live Key"}'),
  ('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002','user.invited','organization','10000000-0000-0000-0000-000000000002','{"email":"user@example.com"}');
