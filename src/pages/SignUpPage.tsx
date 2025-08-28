import {useEffect, useState} from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

const nigerianStates = [
  'Abia State', 'Adamawa State', 'Akwa Ibom State', 'Anambra State', 'Bauchi State', 
  'Bayelsa State', 'Benue State', 'Borno State', 'Cross River State', 'Delta State',
  'Ebonyi State', 'Edo State', 'Ekiti State', 'Enugu State', 'FCT', 'Gombe State',
  'Imo State', 'Jigawa State', 'Kaduna State', 'Kano State', 'Katsina State',
  'Kebbi State', 'Kogi State', 'Kwara State', 'Lagos State', 'Nasarawa State',
  'Niger State', 'Ogun State', 'Ondo State', 'Osun State', 'Oyo State',
  'Plateau State', 'Rivers State', 'Sokoto State', 'Taraba State', 'Yobe State', 'Zamfara State'
];

const propertyTypes = ['2 Bedroom', '3 Bedroom', '4 Bedroom'];

const abujaLocations = ['Life Camp', 'Karsana', 'Gwarinpa', 'Wuye', 'Maitama'];
const lagosLocations = ['Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Ikeja'];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  propertyType: string;
  location: string;
}

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  state_of_origin: string;
  property_type: string;
  location: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  sessionToken: string | null;
}

const SignUpPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    sessionToken: null
  });
  const selectedState = watch('state');

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('teacherData');
    const sessionToken = sessionStorage.getItem('teacherSession');

    if (savedUser && sessionToken) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          sessionToken
        });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear corrupted data
        localStorage.removeItem('teacherUser');
        sessionStorage.removeItem('teacherSession');
      }
    }
  }, []);
  
  const getLocationsForState = (state: string) => {
    if (state === 'FCT') return abujaLocations;
    if (state === 'Lagos State') return lagosLocations;
    return ['Location will be available soon'];
  };

  const generateSessionToken = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const saveUserData = (userData: User, sessionToken: string) => {
    // Save to localStorage for persistence
    localStorage.setItem('teacherUser', JSON.stringify(userData));

    // Save session token to sessionStorage
    sessionStorage.setItem('teacherSession', sessionToken);

    // Update auth state
    setAuthState({
      isAuthenticated: true,
      user: userData,
      sessionToken
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      // Prepare data for API
      const registrationData = {
        ...data,
        phone: data.phone
      };

      // Call the registration API
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();

      // Create user object with API response data
      // const userData: User = {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   email: data.email,
      //   phone: data.phone,
      //   state: data.state,
      //   propertyType: data.propertyType,
      //   location: data.location,
      //   createdAt: new Date().toISOString()
      // };
      //
      // // Generate session token
      // const sessionToken = generateSessionToken();
      //
      // // Save user data and session
      // saveUserData(result, sessionToken);

      console.log('Registration successful:', result);
      setIsSubmitted(false);

      toast({
        title: "Registration Successful!",
        description: "Your account has been created and you are now logged in.",
      });

    } catch (error) {
      console.error('Registration error:', error);

      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-[hsl(var(--government-green))]">Success!</CardTitle>
                <CardDescription>Your application has been submitted successfully.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Thank you for registering your interest. We'll contact you when properties in your preferred location become available.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="government"
                  className="w-full"
                >
                  Submit Another Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Registration</CardTitle>
              <CardDescription>
                Please provide your basic information to register your interest in the Affordable Housing Scheme for Teachers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register('firstName', { required: true })}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register('lastName', { required: true })}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-input bg-muted text-muted-foreground text-sm rounded-l-md">
                      +234
                    </span>
                    <Input
                      id="phone"
                      {...register('phone', { required: true })}
                      placeholder="Enter your phone number"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>State</Label>
                  <Select onValueChange={(value) => setValue('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
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
                  <Label>Property Type of Interest</Label>
                  <Select onValueChange={(value) => setValue('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedState && (
                  <div className="space-y-2">
                    <Label>Preferred Location in {selectedState}</Label>
                    <Select onValueChange={(value) => setValue('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred location" />
                      </SelectTrigger>
                      <SelectContent>
                        {getLocationsForState(selectedState).map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button type="submit" className="w-full" variant="government">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
