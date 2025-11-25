import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import {useEffect, useState} from 'react';

import propertyOne from "../assets/properties/1.jpeg";
import propertyTwo from "../assets/properties/2.jpeg";
import propertyThree from "../assets/properties/3.jpeg";
import propertyFour from "../assets/properties/4.jpeg";
import propertyFive from "../assets/properties/5.jpeg";

const nigerianStates = [
  'Abia State', 'Adamawa State', 'Akwa Ibom State', 'Anambra State', 'Bauchi State', 
  'Bayelsa State', 'Benue State', 'Borno State', 'Cross River State', 'Delta State',
  'Ebonyi State', 'Edo State', 'Ekiti State', 'Enugu State', 'FCT', 'Gombe State',
  'Imo State', 'Jigawa State', 'Kaduna State', 'Kano State', 'Katsina State',
  'Kebbi State', 'Kogi State', 'Kwara State', 'Lagos State', 'Nasarawa State',
  'Niger State', 'Ogun State', 'Ondo State', 'Osun State', 'Oyo State',
  'Plateau State', 'Rivers State', 'Sokoto State', 'Taraba State', 'Yobe State', 'Zamfara State'
];

const propertyTypes = [
  '2 Bedroom (Bungalow)',
  '3 Bedroom (Bungalow)',
  '2 Bedroom (Flat)',
  '3 Bedroom (Flat)',
  '3 Bedroom (Terrace + BQ)',
  '4 Bedroom (Terrace + BQ)',
  '3 Bedroom (Semi-Detached Duplex)',
  '4 Bedroom (Semi-Detached Duplex)',
  '4 Bedroom (Fully Detached Duplex)',
];

// Sample property data
const properties = [
  {
    id: 1,
    title: '3 Bedroom Terrace House',
    location: 'Life Camp, FCT',
    state: 'FCT',
    price: '₦25,500,000',
    monthlyPayment: '₦127,500',
    bedrooms: 3,
    bathrooms: 2,
    area: '120 sqm',
    type: '3 Bedroom',
    status: 'Available',
    image: propertyOne
  },
  {
    id: 2,
    title: '2 Bedroom Apartment',
    location: 'Karsana, FCT',
    state: 'FCT',
    price: '₦18,000,000',
    monthlyPayment: '₦90,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '85 sqm',
    type: '2 Bedroom',
    status: 'Available',
    image: propertyTwo
  },
  {
    id: 3,
    title: '2 Bedroom Apartment',
    location: 'Karsana, FCT',
    state: 'FCT',
    price: '₦18,000,000',
    monthlyPayment: '₦90,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '85 sqm',
    type: '2 Bedroom',
    status: 'Available',
    image: propertyThree
  },
  {
    id: 4,
    title: '2 Bedroom Apartment',
    location: 'Karsana, FCT',
    state: 'FCT',
    price: '₦18,000,000',
    monthlyPayment: '₦90,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '85 sqm',
    type: '2 Bedroom',
    status: 'Available',
    image: propertyFour
  },
  {
    id: 5,
    title: '2 Bedroom Apartment',
    location: 'Karsana, FCT',
    state: 'FCT',
    price: '₦18,000,000',
    monthlyPayment: '₦90,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '85 sqm',
    type: '2 Bedroom',
    status: 'Available',
    image: propertyFive
  },
];

const PropertiesPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    state: '',
    propertyType: '',
    priceRange: ''
  });
  const [showProperties, setShowProperties] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    let filtered = properties;
    
    if (newFilters.state) {
      filtered = filtered.filter(prop => prop.state === newFilters.state);
    }
    
    if (newFilters.propertyType) {
      filtered = filtered.filter(prop => prop.type === newFilters.propertyType);
    }
    
    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setFilters({ state: '', propertyType: '', priceRange: '' });
    setFilteredProperties(properties);
  };

  useEffect(() => {
    if (filters.state.toLowerCase() === "kaduna state") {
      setShowProperties(true);
      console.log(properties)
    } else {
      setShowProperties(false);
    }
  }, [filters.state]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Properties</CardTitle>
            <CardDescription>Find your perfect home using our filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>State</Label>
                <Select 
                  value={filters.state} 
                  onValueChange={(value) => handleFilterChange('state', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select 
                  value={filters.propertyType} 
                  onValueChange={(value) => handleFilterChange('propertyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type, title) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select 
                  value={filters.priceRange} 
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-20m">₦0 - ₦20M</SelectItem>
                    <SelectItem value="20-30m">₦20M - ₦30M</SelectItem>
                    <SelectItem value="30-50m">₦30M - ₦50M</SelectItem>
                    <SelectItem value="50m+">₦50M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid - Only show when Kaduna State is selected */}
        {showProperties ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {filters.state
                ? "No properties available in the selected state. Please try Kaduna State."
                : "Please select Kaduna State to view available properties."}
            </p>
          </div>
        )}

        {/* Properties Grid */}
        {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
        {/*  {filteredProperties.map((property) => (*/}
        {/*    <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">*/}
        {/*      <div className="relative">*/}
        {/*        <img */}
        {/*          src={property.image} */}
        {/*          alt={property.title}*/}
        {/*          className="w-full h-48 object-cover"*/}
        {/*        />*/}
        {/*        <Button */}
        {/*          size="icon" */}
        {/*          variant="ghost" */}
        {/*          className="absolute top-2 right-2 bg-white/80 hover:bg-white"*/}
        {/*        >*/}
        {/*          <Heart className="w-4 h-4" />*/}
        {/*        </Button>*/}
        {/*        <Badge */}
        {/*          className={`absolute top-2 left-2 ${*/}
        {/*            property.status === 'Available' */}
        {/*              ? 'bg-[hsl(var(--government-green))] text-white' */}
        {/*              : 'bg-orange-500 text-white'*/}
        {/*          }`}*/}
        {/*        >*/}
        {/*          {property.status}*/}
        {/*        </Badge>*/}
        {/*      </div>*/}
        {/*      */}
        {/*      <CardContent className="p-4">*/}
        {/*        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>*/}
        {/*        <div className="flex items-center text-muted-foreground mb-3">*/}
        {/*          <MapPin className="w-4 h-4 mr-1" />*/}
        {/*          <span className="text-sm">{property.location}</span>*/}
        {/*        </div>*/}
        {/*        */}
        {/*        <div className="flex justify-between items-center mb-3">*/}
        {/*          <div className="flex space-x-4 text-sm text-muted-foreground">*/}
        {/*            <div className="flex items-center">*/}
        {/*              <Bed className="w-4 h-4 mr-1" />*/}
        {/*              {property.bedrooms}*/}
        {/*            </div>*/}
        {/*            <div className="flex items-center">*/}
        {/*              <Bath className="w-4 h-4 mr-1" />*/}
        {/*              {property.bathrooms}*/}
        {/*            </div>*/}
        {/*            <div className="flex items-center">*/}
        {/*              <Square className="w-4 h-4 mr-1" />*/}
        {/*              {property.area}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        */}
        {/*        <div className="space-y-2">*/}
        {/*          <div className="text-lg font-bold text-[hsl(var(--government-green))]">*/}
        {/*            {property.price}*/}
        {/*          </div>*/}
        {/*          <div className="text-sm text-muted-foreground">*/}
        {/*            Monthly: {property.monthlyPayment} (NHF 6% rate)*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        */}
        {/*        <div className="mt-4 space-y-2">*/}
        {/*          <Button className="w-full" variant="government">*/}
        {/*            View Details*/}
        {/*          </Button>*/}
        {/*          <Button className="w-full" variant="outline">*/}
        {/*            Schedule Visit*/}
        {/*          </Button>*/}
        {/*        </div>*/}
        {/*      </CardContent>*/}
        {/*    </Card>*/}
        {/*  ))}*/}
        {/*</div>*/}

        {/*{filteredProperties.length === 0 && (*/}
        {/*  <div className="text-center py-12">*/}
        {/*    <p className="text-muted-foreground text-lg">No properties match your current filters.</p>*/}
        {/*    <Button onClick={clearFilters} variant="government" className="mt-4">*/}
        {/*      View All Properties*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*)}*/}
      </main>
      <Footer />
    </div>
  );
};

export default PropertiesPage;
