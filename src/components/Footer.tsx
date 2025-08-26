import { Button } from '@/components/ui/button';

export const Footer = () => {
  const footerLinks = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Properties', href: '/properties' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
  ];

  return (
    <footer className="bg-[hsl(var(--government-green))] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-2xl font-bold">
              Hope Homes
            </div>
            <p className="text-white/80 max-w-md">
              Making the dream of home ownership a reality for every Nigerian through 
              innovative financing solutions and affordable housing programs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Federal Ministry</h3>
            <div className="text-white/80 space-y-2">
              <p>Housing & Urban Development</p>
              <p>Federal Republic of Nigeria</p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <h4 className="font-semibold">Privacy Notice</h4>
            <p className="text-sm text-white/80">
              We take your policy seriously and only process your personal information to ensure 
              you get the best experience on our website. Your consent to the processing data while 
              engaging with our website is in accordance with the NDP Act. Read our{' '}
              <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a>{' '}
              and <a href="/cookie-policy" className="underline hover:text-white">Cookie Policy</a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" size="sm">
                Accept All
              </Button>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-[hsl(var(--government-green))]">
                Reject All
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            © 2024 Federal Ministry of Housing & Urban Development. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};