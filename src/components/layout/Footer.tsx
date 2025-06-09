import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Example social icons

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  siteName?: string;
  sections?: FooterSection[];
  socialLinks?: { platform: 'twitter' | 'linkedin' | 'github'; url: string }[];
}

const defaultSections: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping & Returns' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

const defaultSocials: FooterProps['socialLinks'] = [
    { platform: 'twitter', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'github', url: '#' },
];

const Footer: React.FC<FooterProps> = ({
  siteName = 'My Site',
  sections = defaultSections,
  socialLinks = defaultSocials,
}) => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const SocialIcon = ({ platform }: { platform: 'twitter' | 'linkedin' | 'github' }) => {
    if (platform === 'twitter') return <Twitter className="h-5 w-5" />;
    if (platform === 'linkedin') return <Linkedin className="h-5 w-5" />;
    if (platform === 'github') return <Github className="h-5 w-5" />;
    return null;
  };

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul role="list" className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} {siteName}. All rights reserved.</p>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex space-x-5 mt-4 sm:mt-0">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">{social.platform}</span>
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
export default Footer;