import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from "@/hooks/useAuth.js.ts";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { authState } = useAuth()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Application Form', href: '/application-form' },
  ];

  const showApplicationForm = authState.isAuthenticated && authState.sessionToken;

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      {/* Announcement Banner */}
      <div className="bg-[hsl(var(--government-green))] text-white py-2 px-4 text-center text-sm font-medium">
        Get NHF mortgage at <strong>6%</strong> and FMBN Non-interest Rent-to-Own. Secure a unit today in Karsana, FCT Abuja by making a minimum downpayment of 20%. Unit allocation is on a first come, first serve basis.{' '}
        <Button 
          variant="link" 
          className="text-white underline p-0 h-auto font-medium"
          asChild
        >
          <Link to="/sign-up">Click here to apply</Link>
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-xl md:text-2xl font-bold text-[hsl(var(--government-green))]">
              Teachers <span className="text-foreground">Housing</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-foreground hover:text-[hsl(var(--government-green))] font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="text-foreground hover:text-[hsl(var(--government-green))] font-medium transition-colors"
              >
                Properties
              </Link>
              <Link
                to="/calculator"
                className="text-foreground hover:text-[hsl(var(--government-green))] font-medium transition-colors"
              >
                Calculator
              </Link>
              {showApplicationForm && (
                <Link
                  to="/application-form"
                  className="text-foreground hover:text-[hsl(var(--government-green))] font-medium transition-colors"
                >
                  Application Form
                </Link>
              )}
            </nav>
          )}

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <>
                <Button variant="ghost" size="sm">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button variant="government" size="sm" asChild>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
              />
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-[hsl(var(--government-green))] font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="justify-start">
                <Link to="/login">Log In</Link>
              </Button>
              <Button variant="government" size="sm" asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
