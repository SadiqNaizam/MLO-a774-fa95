import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react'; // Added Menu and X for mobile

interface NavItem {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  navItems?: NavItem[];
  siteTitle?: string;
  cartItemCount?: number;
}

const defaultNavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  navItems = defaultNavItems,
  siteTitle = 'MyApp',
  cartItemCount = 0,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobileOpen:", isMobileMenuOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Mobile menu toggled, new state:", !isMobileMenuOpen);
  };

  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-primary">
              {siteTitle}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Icons and Mobile Menu Toggle */}
          <div className="flex items-center">
            <Link to="/cart" className="relative mr-2">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/account" className="hidden md:block">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <div className="md:hidden ml-2">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground hover:text-primary hover:bg-muted px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground hover:text-primary hover:bg-muted px-3 py-2 rounded-md text-base font-medium"
              >
                My Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavigationMenu;