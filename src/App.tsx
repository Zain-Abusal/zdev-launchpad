import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

import Home from "./pages/public/Home";
import Pricing from "./pages/public/Pricing";
import Features from "./pages/public/Features";
import BlogList from "./pages/public/BlogList";
import BlogPost from "./pages/public/BlogPost";
import StatusPage from "./pages/public/StatusPage";
import ContactPage from "./pages/public/ContactPage";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import ClientDashboard from "./pages/app/Dashboard";
import ApiKeys from "./pages/app/ApiKeys";
import Apps from "./pages/app/Apps";
import Billing from "./pages/app/Billing";
import Logs from "./pages/app/Logs";
import Team from "./pages/app/Team";
import Settings from "./pages/app/Settings";
import Help from "./pages/app/Help";

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Organizations from "./pages/admin/Organizations";
import AdminApiKeys from "./pages/admin/AdminApiKeys";
import AdminLogs from "./pages/admin/AdminLogs";
import AuditLog from "./pages/admin/AuditLog";
import Plans from "./pages/admin/Plans";
import Subscriptions from "./pages/admin/Subscriptions";
import Invoices from "./pages/admin/Invoices";
import AdminBlog from "./pages/admin/AdminBlog";
import SupportTickets from "./pages/admin/SupportTickets";
import SystemStatus from "./pages/admin/SystemStatus";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";
import DocsEmbed from "./pages/DocsEmbed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/docs" element={<DocsEmbed />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              <Route path="/app/dashboard" element={<ClientDashboard />} />
              <Route path="/app/api-keys" element={<ApiKeys />} />
              <Route path="/app/apps" element={<Apps />} />
              <Route path="/app/billing" element={<Billing />} />
              <Route path="/app/logs" element={<Logs />} />
              <Route path="/app/team" element={<Team />} />
              <Route path="/app/settings" element={<Settings />} />
              <Route path="/app/help" element={<Help />} />
              <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />

              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/organizations" element={<Organizations />} />
              <Route path="/admin/api-keys" element={<AdminApiKeys />} />
              <Route path="/admin/logs" element={<AdminLogs />} />
              <Route path="/admin/audit-log" element={<AuditLog />} />
              <Route path="/admin/plans" element={<Plans />} />
              <Route path="/admin/subscriptions" element={<Subscriptions />} />
              <Route path="/admin/invoices" element={<Invoices />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/support-tickets" element={<SupportTickets />} />
              <Route path="/admin/status" element={<SystemStatus />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
