import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">zdev</h3>
            <p className="text-sm text-muted-foreground">
              Custom websites, systems, and Python tools for businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">All Services</Link></li>
              <li><Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link></li>
              <li><Link to="/demos" className="text-muted-foreground hover:text-foreground transition-colors">Demos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/docs-embed" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} zdev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
