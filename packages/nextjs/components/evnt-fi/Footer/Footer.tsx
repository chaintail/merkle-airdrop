import React from 'react';
import { Dog, Send, Twitter, BookOpen, Globe, LayoutDashboard, Rocket, LucideIcon, X } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
    { icon: Globe, label: 'Website', href: 'https://www.chaintail.com' },
    { icon: LayoutDashboard, label: 'DApp', href: 'https://app.chaintail.com' },
    { icon: BookOpen, label: 'Gitbook', href: 'https://docs.chaintail.com' },
  // { icon: BookOpen, label: 'Forum', href: 'https://forum.chaintail.com' },
  // { icon: LayoutDashboard, label: 'Vote', href: 'https://snapshot.org/#/chaintailxyz.eth' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/chaintail' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/chaintaillabs' },
];
const OTHER_LINKS: SocialLink[] = [
  { icon: Rocket, label: 'EVNT.fi', href: 'https://evnt.fi' }
];

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`mt-auto ${
      theme === 'dark' ? 'bg-gray-800/30 backdrop-blur-sm' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Dog className={theme === 'dark' ? 'text-blue-400 w-6 h-6' : 'text-blue-600 w-6 h-6'} />
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>chaintail labs demo</span>
            
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {OTHER_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>
            © 2025 Chaintail Labs
          </div>
        </div>
      </div>
    </footer>
  );
}; 