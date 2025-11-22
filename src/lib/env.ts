// Environment configuration helper
export const env = {
  // Core
  siteName: import.meta.env.VITE_ZDEV_SITE_NAME || 'zdev',
  baseUrl: import.meta.env.VITE_ZDEV_BASE_URL || window.location.origin,
  tagline: import.meta.env.VITE_ZDEV_BRAND_TAGLINE || 'Custom websites, systems, and Python tools.',
  
  // Docs
  docsUrl: import.meta.env.VITE_ZDEV_DOCS_URL || '/docs',
  docsGettingStarted: import.meta.env.VITE_ZDEV_DOCS_GETTING_STARTED_URL || '/docs#getting-started',
  docsSystems: import.meta.env.VITE_ZDEV_DOCS_SYSTEMS_URL || '/docs#systems',
  docsPython: import.meta.env.VITE_ZDEV_DOCS_PYTHON_URL || '/docs#python',
  docsFaq: import.meta.env.VITE_ZDEV_DOCS_FAQ_URL || '/docs#faq',
  
  // Auth
  adminEmail: import.meta.env.VITE_ZDEV_ADMIN_EMAIL || 'admin@example.com',
  
  // Contact
  supportEmail: import.meta.env.VITE_ZDEV_SUPPORT_EMAIL || 'support@zdev.dev',
  chatEnabled: import.meta.env.VITE_ZDEV_CHAT_ENABLED === 'true',
  
  // Theme
  defaultTheme: import.meta.env.VITE_ZDEV_DEFAULT_THEME || 'light',
  themeToggleEnabled: import.meta.env.VITE_ZDEV_ENABLE_THEME_TOGGLE !== 'false',
  
  // SEO
  seoTitle: import.meta.env.VITE_ZDEV_DEFAULT_SEO_TITLE || 'zdev – Freelance Web & Software Developer',
  seoDescription: import.meta.env.VITE_ZDEV_DEFAULT_SEO_DESCRIPTION || 'Custom websites, systems, and Python tools for businesses.',
  seoImage: import.meta.env.VITE_ZDEV_DEFAULT_SEO_IMAGE || '/og-default.png',
  seoAuthor: import.meta.env.VITE_ZDEV_SEO_META_AUTHOR || 'zdev',
  seoTwitterHandle: import.meta.env.VITE_ZDEV_SEO_TWITTER_HANDLE || '@zdev',
};
