import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";

// Public Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Demos from "./pages/Demos";
import Blog from "./pages/Blog";
import BlogPost from "./pages/blog/[slug]";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import DocsEmbed from "./pages/DocsEmbed";
import Search from "./pages/Search";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import GDPR from "./pages/legal/GDPR";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Callback from "./pages/auth/Callback";

// Client Pages
import ClientDashboard from "./pages/client/Dashboard";
import ClientProjects from "./pages/client/Projects";
import ClientProjectDetail from "./pages/client/ProjectDetail";
import ClientProfile from "./pages/client/Profile";
import ClientBilling from "./pages/client/Billing";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminClients from "./pages/admin/Clients";
import AdminProjects from "./pages/admin/AdminProjects";
import { AdminBlog } from "./pages/admin/Blog";
import AdminRequests from "./pages/admin/Requests";
import AdminSettings from "./pages/admin/Settings";
import AdminPortfolio from "./pages/admin/Portfolio";
import AdminImageManager from "./pages/admin/ImageManager";
import AdminDemos from "./pages/admin/Demos";
import AdminDocsLinks from "./pages/admin/DocsLinks";
import AdminLicenses from "./pages/admin/Licenses";
import AdminSupport from "./pages/admin/Support";
import AdminCodeEditor from "./pages/admin/CodeEditor";
import AdminLogs from "./pages/admin/Logs";
import AdminAnnouncement from "./pages/admin/Announcement";
import MarketingDashboard from "./pages/admin/MarketingDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();



import { useAuth } from '@/contexts/AuthContext';
import { logActivity } from '@/lib/utils';

const DevtoolsLogger: React.FC = () => {
  const { user } = useAuth();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!user) return;
      if (e.key === 'F12') {
        logActivity('devtools_open', 'Devtools opened via F12', user.id, user.email);
      }
      if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'I')) {
        logActivity('devtools_open', 'Devtools opened via keybind', user.id, user.email);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [user]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <DevtoolsLogger />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              <Route path="/demos" element={<Demos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/docs-embed" element={<DocsEmbed />} />
              <Route path="/search" element={<Search />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/gdpr" element={<GDPR />} />

              {/* Auth Routes */}
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/callback" element={<Callback />} />

              {/* Client Routes */}
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/client/projects" element={<ClientProjects />} />
              <Route path="/client/projects/:id" element={<ClientProjectDetail />} />
              <Route path="/client/profile" element={<ClientProfile />} />
              <Route path="/client/billing" element={<ClientBilling />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/requests" element={<AdminRequests />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/marketing" element={<MarketingDashboard />} />
              
              {/* All admin pages */}
              <Route path="/admin/portfolio" element={<AdminPortfolio />} />
              <Route path="/admin/images" element={<AdminImageManager />} />
              <Route path="/admin/demos" element={<AdminDemos />} />
              <Route path="/admin/docs-links" element={<AdminDocsLinks />} />
              <Route path="/admin/licenses" element={<AdminLicenses />} />
              <Route path="/admin/support" element={<AdminSupport />} />
              <Route path="/admin/editor" element={<AdminCodeEditor />} />
              <Route path="/admin/logs" element={<AdminLogs />} />
              <Route path="/admin/announcement" element={<AdminAnnouncement />} />
              <Route path="/admin/blog" element={<AdminBlog />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
