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
import {useAuth} from "@/hooks/useAuth.js.ts";
import {Link} from "react-router-dom";

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi',
  'Bayelsa', 'Benue State', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano State', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo State',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const propertyTypes = ['2 Bedroom', '3 Bedroom', '4 Bedroom'];

const abujaLocations = ['Life Camp', 'Karsana', 'Gwarinpa', 'Wuye', 'Maitama'];
const lagosLocations = ['Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Ikeja'];

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const {
    authState,
    user,
    register: registerTeacher,
    logout,
  } = useAuth();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await registerTeacher({...data, property_type: "2 bedroom", state_of_origin: "kaduns"});
      setIsSubmitted(true);

      setIsLoading(false);

      toast({
        title: "Registration Successful!",
        description: "Your account has been created and you are now logged in.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
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
                <CardDescription>Registration is successful.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Thank you for registering. Click the button downn below to submit application .
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="government"
                  className="w-full"
                >
                  <Link to="/application-form">Submit Application</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If user is already authenticated, show success page
  if (authState.isAuthenticated && isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-[hsl(var(--government-green))]">Welcome Back!</CardTitle>
                <CardDescription>
                  Hello {user?.firstname}, your registration is active.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-left space-y-2 mb-4">
                  <p><strong>Name:</strong> {user?.firstname} {user?.lastname}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="government"
                    className="w-full"
                  >
                    Update Registration
                  </Button>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If user is authenticated but hasn't submitted new form, show their existing data
  if (authState.isAuthenticated && !isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Welcome Back, {user?.firstname}!</CardTitle>
                    <CardDescription>
                      You are already registered and submit your application.
                    </CardDescription>
                  </div>
                  <Button onClick={logout} variant="outline">
                    Logout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Your Current Registration:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><strong>Name:</strong> {user?.firstname} {user?.lastname}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="government"
                    className="w-full"
                  >
                    <Link to="/application-form">Submit Application</Link>
                  </Button>
                </div>
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
                      {...register('firstname', {required: true})}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register('lastname', {required: true})}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {required: true})}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {required: true})}
                    placeholder="Enter your password"
                  />
                </div>

                {/*<div className="space-y-2">*/}
                {/*  <Label htmlFor="phone">Phone Number</Label>*/}
                {/*  <div className="flex">*/}
                {/*    <span*/}
                {/*      className="inline-flex items-center px-3 border border-r-0 border-input bg-muted text-muted-foreground text-sm rounded-l-md">*/}
                {/*      +234*/}
                {/*    </span>*/}
                {/*    <Input*/}
                {/*      id="phone"*/}
                {/*      {...register('phone', {required: true})}*/}
                {/*      placeholder="Enter your phone number"*/}
                {/*      className="rounded-l-none"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="space-y-2">*/}
                {/*  <Label>State</Label>*/}
                {/*  <Select onValueChange={(value) => setValue('state_of_origin', value)}>*/}
                {/*    <SelectTrigger>*/}
                {/*      <SelectValue placeholder="Select your state"/>*/}
                {/*    </SelectTrigger>*/}
                {/*    <SelectContent>*/}
                {/*      {nigerianStates.map((state) => (*/}
                {/*        <SelectItem key={state} value={state}>*/}
                {/*          {state}*/}
                {/*        </SelectItem>*/}
                {/*      ))}*/}
                {/*    </SelectContent>*/}
                {/*  </Select>*/}
                {/*</div>*/}

                {/*<div className="space-y-2">*/}
                {/*  <Label>Property Type of Interest</Label>*/}
                {/*  <Select onValueChange={(value) => setValue('property_type', value)}>*/}
                {/*    <SelectTrigger>*/}
                {/*      <SelectValue placeholder="Select property type"/>*/}
                {/*    </SelectTrigger>*/}
                {/*    <SelectContent>*/}
                {/*      {propertyTypes.map((type) => (*/}
                {/*        <SelectItem key={type} value={type}>*/}
                {/*          {type}*/}
                {/*        </SelectItem>*/}
                {/*      ))}*/}
                {/*    </SelectContent>*/}
                {/*  </Select>*/}
                {/*</div>*/}

                {/*{selectedState && (*/}
                {/*  <div className="space-y-2">*/}
                {/*    <Label>Preferred Location in {selectedState}</Label>*/}
                {/*    <Select onValueChange={(value) => setValue('location', value)}>*/}
                {/*      <SelectTrigger>*/}
                {/*        <SelectValue placeholder="Select preferred location" />*/}
                {/*      </SelectTrigger>*/}
                {/*      <SelectContent>*/}
                {/*        {getLocationsForState(selectedState).map((location) => (*/}
                {/*          <SelectItem key={location} value={location}>*/}
                {/*            {location}*/}
                {/*          </SelectItem>*/}
                {/*        ))}*/}
                {/*      </SelectContent>*/}
                {/*    </Select>*/}
                {/*  </div>*/}
                {/*)}*/}

                <Button
                  type="submit"
                  className="w-full"
                  variant="government"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default SignUpPage;
