import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import heroImage from '@/assets/hero-housing.jpg';
import ministryLogo from '@/assets/ministry-logo.png';

export const Hero = () => {
  const propertyTypes = [
    'All',
    'Condominium',
    'Fully-Detached Duplex',
    'Semi-detached Duplex',
    'Detached Bungalows',
    'Apartments',
    'Flats',
    'Terraces',
    'Maisonette',
    'Penthouse',
    'Terrace Bungalows',
    'Semi Detached Bungalow',
    'Terrace Duplex',
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Ministry Logo */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
              <img 
                src={ministryLogo} 
                alt="Federal Ministry of Housing & Urban Development"
                className="w-20 h-20 mx-auto"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Renewed Hope Housing
            <br />
            <span className="text-[hsl(var(--government-green-light))]">Delivery Portal</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to Renewed Hope Housing Delivery Portal! Through our innovative home ownership through NHF Loans at{' '}
            <strong className="text-[hsl(var(--government-green-light))]">6% interest rate</strong>{' '}
            and FMBN Non-Interest Rent-to-Own Scheme, we aim to make the dream of owning a home a reality for you. 
            Join us in our journey towards a future where every Nigerian has a place to call home.
          </p>

          {/* Property Search */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <Select>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white/70">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="hero"
                size="lg"
                className="w-full md:w-auto px-8"
                asChild
              >
                <Link to="/properties">
                  <Search className="w-5 h-5 mr-2" />
                  Search Properties
                </Link>
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-[hsl(var(--government-green))] hover:bg-[hsl(var(--government-green))]/90 text-white px-8 py-3"
              asChild
            >
              <Link to="/sign-up">Get Started - Apply Now</Link>
            </Button>
            
            <Button 
              variant="government-outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[hsl(var(--government-green))] px-8 py-3"
            >
              Watch a short video on How to Secure Your Home in 3 Simple Steps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};