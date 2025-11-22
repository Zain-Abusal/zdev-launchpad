# zdev – Freelance Developer Brand

A complete full-stack freelance developer brand built with React, TypeScript, Tailwind CSS, and Supabase. Features a polished marketing site, client portal, and comprehensive admin panel.

## 🚀 Features

### Marketing Site
- **Home Page** – Hero section, services overview, process timeline, and CTAs
- **Services** – Detailed service offerings (Websites, Systems, Python Tools)
- **Portfolio** – Filterable project showcase with database integration
- **Demos** – Interactive demo showcases
- **Blog** – Full blog system with Supabase backend
- **Contact** – Contact form with message storage
- **Get Started** – Project request form for new clients
- **Docs** – Embedded Mintlify documentation via iframe

### Client Portal
- **Dashboard** – Project overview, notifications, and activity log
- **Projects** – View all client projects with detailed pages
- **Project Details** – Overview, documentation links, downloads, and license info
- **Profile** – Manage personal information
- **Billing** – View billing status and information

### Admin Panel
- **Dashboard** – Business metrics and statistics
- **Clients Management** – View and manage all clients
- **Projects Management** – Full CRUD for projects
- **Blog Management** – Create, edit, and publish blog posts
- **Portfolio Management** – Manage portfolio projects with images and tech stack
- **Demos Management** – Manage demo projects
- **Docs Links** – Manage documentation categories and links
- **License Overview** – Track software licenses, domains, and activations
- **Project Requests** – Review incoming project requests
- **Support Inbox** – Manage customer support messages
- **Code Editor** – View project files and export as ZIP
- **Settings** – Configure branding, announcements, and theme

### Authentication
- ✅ Email/password sign up & sign in
- ✅ Google OAuth integration
- ✅ GitHub OAuth integration
- ✅ Role-based access (Admin vs Client)
- ✅ Automatic routing based on role

### Design & UX
- 🎨 Clean, professional Obsidian theme
- 🌓 Light/dark mode with theme toggle
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 Proper SEO with semantic HTML
- 💬 Floating chat button
- 📢 Dismissible announcement bar

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **Animations:** Framer Motion
- **Backend:** Supabase (Database, Auth, Storage)
- **State:** React Query
- **Routing:** React Router v6

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (automatically configured by Lovable)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd zdev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

   Key variables to set:
   - `VITE_ZDEV_ADMIN_EMAIL` – Admin email for role-based access
   - `VITE_ZDEV_DOCS_URL` – URL for Mintlify docs (default: `/docs`)
   - `VITE_ZDEV_SUPPORT_EMAIL` – Support contact email

4. **Configure Supabase Auth**

   Go to your Supabase project dashboard:
   - Navigate to **Authentication → Providers**
   - Enable **Google** and **GitHub** OAuth
   - Add redirect URLs: `https://yourdomain.com/`
   - Optionally disable "Confirm email" for faster testing

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:8080](http://localhost:8080)

## 🔐 Authentication Setup

### Admin Access
The admin panel is accessible to users whose email matches `VITE_ZDEV_ADMIN_EMAIL`. 

To set an admin:
1. Update `.env` with your admin email
2. Sign up with that email
3. You'll be automatically routed to `/admin`

### OAuth Providers

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized JavaScript origins: `https://yourdomain.com`
4. Add authorized redirect URIs from Supabase dashboard
5. Add Client ID and Secret in Supabase Auth settings

**GitHub OAuth:**
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Add Authorization callback URL from Supabase dashboard
4. Add Client ID and Secret in Supabase Auth settings

## 📚 Documentation Integration

This project uses **Mintlify** for documentation, embedded via iframe.

### Setup Mintlify Docs

1. Deploy your Mintlify docs to the same domain at `/docs`
2. Configure `VITE_ZDEV_DOCS_URL` in `.env`
3. The docs page will embed them automatically

### Custom Project Docs

Projects can have custom documentation URLs:
- Set the `demo_url` field to a docs link (e.g., `https://docs.example.com/project-name`)
- If the URL contains `/docs`, it will show as "Custom Documentation" in the client portal
- Otherwise, it shows the general documentation link

## 🎨 Customization

### Theme Customization

All design tokens are in `src/index.css`:
- Colors (HSL format only)
- Shadows
- Gradients
- Animations
- Typography

**DO NOT** edit theme files unless specifically customizing the design system.

### Adding Content

Use the admin panel to add:
- Blog posts
- Portfolio projects
- Demo showcases
- Documentation links
- Announcements

## 🚀 Deployment

### Deploy via Lovable

1. Click **Publish** in the top right of Lovable
2. Click **Update** to push frontend changes
3. Backend changes (edge functions, migrations) deploy automatically

### Self-Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to any static hosting:
   - Vercel
   - Netlify
   - Cloudflare Pages
   - Your own server

3. Set environment variables in your hosting platform

## 📁 Project Structure

```
zdev/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Sidebar, Layouts
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # Theme and Auth contexts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (env, utils)
│   ├── pages/
│   │   ├── auth/            # Sign in, Sign up
│   │   ├── client/          # Client portal pages
│   │   ├── admin/           # Admin panel pages
│   │   └── [public pages]   # Home, Services, etc.
│   ├── integrations/
│   │   └── supabase/        # Supabase client & types
│   └── App.tsx              # Main app with routing
├── .env.example             # Environment variables template
└── README.md
```

## 🔧 Database Schema

Key Supabase tables:
- `profiles` – User profiles and roles
- `clients` – Client information
- `projects` – Portfolio and demo projects
- `blog_posts` – Blog content
- `docs` – Documentation links
- `licenses` – Software licenses
- `license_domains` – Licensed domains
- `chat_messages` – Contact/support messages
- `project_requests` – New project requests
- `header_announcements` – Site announcements

All tables have proper RLS (Row-Level Security) policies.

## 🎯 Features Roadmap

- [x] Complete marketing site
- [x] Client portal with project management
- [x] Admin panel with full CRUD
- [x] Authentication (Email, Google, GitHub)
- [x] Blog system
- [x] Portfolio management
- [x] License tracking
- [x] Support inbox
- [ ] Real-time chat system
- [ ] File upload/download for projects
- [ ] Invoice generation
- [ ] Advanced analytics dashboard
- [ ] Email notifications

## 📄 License

This project is built for freelance use. Customize and deploy as needed for your business.

## 🤝 Support

For issues or questions:
- Check the [Lovable documentation](https://docs.lovable.dev/)
- Review Supabase docs for backend questions
- Contact support at the configured `VITE_ZDEV_SUPPORT_EMAIL`

---

Built with ❤️ using [Lovable](https://lovable.dev)
