import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL?.split(',') || '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));

const port = process.env.PORT || 4000;

// simple in-memory demo data
const organizations = [
  { id: '10000000-0000-0000-0000-000000000001', name: 'Acme Corp', slug: 'acme', plan: 'pro', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000002', name: 'Globex', slug: 'globex', plan: 'enterprise', created_at: new Date().toISOString() },
];

const users = [
  { id: '00000000-0000-0000-0000-000000000001', email: 'admin@example.com', is_staff: true, staff_role: 'staff_admin', created_at: new Date().toISOString() },
  { id: '00000000-0000-0000-0000-000000000002', email: 'support@example.com', is_staff: true, staff_role: 'staff_support', created_at: new Date().toISOString() },
  { id: '00000000-0000-0000-0000-000000000003', email: 'user@example.com', is_staff: false, staff_role: null, created_at: new Date().toISOString() },
];

const apiKeys = [
  { id: '60000000-0000-0000-0000-000000000001', organization_id: organizations[0].id, name: 'Acme Sandbox Key', key_prefix: 'sk_live_acme', scopes: ['read'], status: 'active', created_at: new Date().toISOString(), last_used_at: new Date().toISOString() },
  { id: '60000000-0000-0000-0000-000000000002', organization_id: organizations[0].id, name: 'Acme Mobile Key', key_prefix: 'sk_live_mobile', scopes: ['read', 'write'], status: 'active', created_at: new Date().toISOString(), last_used_at: new Date().toISOString() },
  { id: '60000000-0000-0000-0000-000000000003', organization_id: organizations[1].id, name: 'Globex Live', key_prefix: 'sk_live_globex', scopes: ['read'], status: 'active', created_at: new Date().toISOString(), last_used_at: new Date().toISOString() },
];

const requestLogs = [
  { organization: 'acme', app: 'acme-live', path: '/v1/widgets', status: 200, count: 1200 },
  { organization: 'acme', app: 'acme-mobile', path: '/v1/mobile', status: 200, count: 845 },
  { organization: 'globex', app: 'globex-pay', path: '/v1/payments', status: 500, count: 42 },
];

const statusComponents = [
  { name: 'API', status: 'operational' },
  { name: 'Dashboard', status: 'operational' },
  { name: 'Database', status: 'operational' },
  { name: 'Queue', status: 'investigating' },
];

const incidents = [
  { id: uuid(), title: 'API latency spike', status: 'investigating', impact: 'major', started_at: new Date().toISOString(), resolved_at: null },
  { id: uuid(), title: 'Database maintenance', status: 'resolved', impact: 'minor', started_at: new Date(Date.now() - 86400000).toISOString(), resolved_at: new Date().toISOString() },
];

const supportTickets: any[] = [
  { id: uuid(), name: 'Jane Doe', email: 'jane@example.com', company: 'Acme', category: 'support', message: 'Having trouble with rate limits', created_at: new Date().toISOString() },
];

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const accessToken = 'access-token';
  const refreshToken = 'refresh-token';
  res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax' });
  res.json({ token: accessToken, user: { email, name: 'Demo User', is_staff: false, staff_role: null } });
});

app.get('/api/auth/me', (_req, res) => {
  res.json({
    user: { id: '00000000-0000-0000-0000-000000000003', email: 'user@example.com', name: 'Demo User', is_staff: false, staff_role: null },
    organizations,
  });
});

app.get('/api/dashboard/client', (_req, res) => {
  res.json({
    metrics: {
      requestsToday: 1245,
      requests30d: 45500,
      errorRate24h: 0.7,
      activeKeys: apiKeys.length,
      series: Array.from({ length: 30 }).map((_, idx) => ({ day: idx + 1, requests: 500 + idx * 5, errors: Math.max(0, 10 - idx) })),
    },
    activity: [
      { id: uuid(), action: 'api_key.created', created_at: new Date().toISOString(), metadata: { name: 'New key' } },
      { id: uuid(), action: 'member.invited', created_at: new Date().toISOString(), metadata: { email: 'teammate@example.com' } },
    ],
  });
});

app.get('/api/api-keys', (_req, res) => res.json({ data: apiKeys }));
app.post('/api/api-keys', (req, res) => {
  const keyId = uuid();
  const prefix = `sk_live_${keyId.slice(0, 6)}`;
  const apiKey = { id: keyId, organization_id: organizations[0].id, name: req.body.name || 'New Key', key_prefix: prefix, scopes: req.body.scopes || ['read'], status: 'active' };
  apiKeys.push(apiKey);
  res.json({ full_key: `${prefix}.${uuid()}`, key: apiKey });
});

app.get('/api/admin/users', (_req, res) => {
  res.json({ data: users });
});

app.get('/api/admin/overview', (_req, res) => {
  const totals = {
    users: users.length,
    organizations: organizations.length,
    apiKeys: apiKeys.length,
    requests24h: requestLogs.reduce((sum, log) => sum + log.count, 0),
    mrr: 124000,
  };

  res.json({
    totals,
    latestUsers: users.slice(-5),
    latestOrganizations: organizations.slice(-5),
    incidents: incidents.filter((incident) => incident.status !== 'resolved'),
  });
});

app.get('/api/admin/logs', (_req, res) => {
  res.json({ data: requestLogs });
});

app.get('/api/status', (_req, res) => {
  res.json({ components: statusComponents, incidents });
});

app.post('/api/support/tickets', (req, res) => {
  const ticket = { id: uuid(), ...req.body, created_at: new Date().toISOString() };
  supportTickets.push(ticket);
  res.status(201).json({ id: ticket.id });
});

app.get('/v1/ping', (_req, res) => {
  res.json({ ok: true, message: 'pong', key: { scopes: ['read'], organization: organizations[0].slug } });
});

app.get('/v1/me', (_req, res) => {
  res.json({ organization: organizations[0], plan: 'pro', scopes: ['read'], usage: { month: 12000, limit: 100000 } });
});

app.get('/v1/widgets', (_req, res) => res.json({ data: [{ id: 'w1', name: 'Widget One' }] }));
app.post('/v1/widgets', (req, res) => res.status(201).json({ id: uuid(), ...req.body }));
app.get('/v1/widgets/:id', (req, res) => res.json({ id: req.params.id, name: 'Widget Detail' }));
app.delete('/v1/widgets/:id', (req, res) => res.json({ deleted: true, id: req.params.id }));

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
