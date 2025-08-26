import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
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

interface FormData {
  // Location preferences
  state: string;
  projectLocation: string;
  projectSite: string;
  propertyType: string;
  
  // Payment
  paymentMode: string;
  
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  stateOfOrigin: string;
  
  // Financial Info
  bvn: string;
  nin: string;
  monthlyIncome: string;
  employmentStatus: string;
  employerName: string;
  employerAddress: string;
  
  // Bank Details
  bankName: string;
  accountNumber: string;
  
  // Next of Kin
  nextOfKinName: string;
  nextOfKinRelation: string;
  nextOfKinPhone: string;
  nextOfKinAddress: string;
}

const ApplicationFormPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const onSubmit = (data: FormData) => {
    console.log('Comprehensive form submitted:', data);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted Successfully!",
      description: "Your comprehensive application has been received. Our team will review and contact you within 5-7 business days.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-[hsl(var(--government-green))]">Application Submitted!</CardTitle>
                <CardDescription>Your comprehensive application has been received</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Thank you for completing your detailed application. Our team will review your information and contact you within 5-7 business days with next steps.
                </p>
                <div className="space-y-2 text-left">
                  <p><strong>Reference Number:</strong> NHF-{Date.now().toString().slice(-6)}</p>
                  <p><strong>Status:</strong> Under Review</p>
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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Application Form</CardTitle>
              <CardDescription>
                Complete this detailed form to proceed with your housing application through the National Housing Fund
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This form requires sensitive personal and financial information including BVN and NIN. 
                  All information is encrypted and handled securely according to government data protection standards.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Property Preferences */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select onValueChange={(value) => setValue('state', value)}>
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
                      <Select onValueChange={(value) => setValue('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-bedroom">2 Bedroom</SelectItem>
                          <SelectItem value="3-bedroom">3 Bedroom</SelectItem>
                          <SelectItem value="4-bedroom">4 Bedroom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Mode */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Mode</h3>
                  <RadioGroup onValueChange={(value) => setValue('paymentMode', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outright" id="outright" />
                      <Label htmlFor="outright">Outright Payment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="installmental" id="installmental" />
                      <Label htmlFor="installmental">Installmental Payment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nhf-loan" id="nhf-loan" />
                      <Label htmlFor="nhf-loan">NHF Loan (6% Interest)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="commercial" />
                      <Label htmlFor="commercial">Commercial Mortgage</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" {...register('firstName', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" {...register('lastName', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input id="dateOfBirth" type="date" {...register('dateOfBirth', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" {...register('phone', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label>State of Origin</Label>
                      <Select onValueChange={(value) => setValue('stateOfOrigin', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State of Origin" />
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
                  </div>
                </div>

                <Separator />

                {/* Identification & Financial */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Identification & Financial Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                      <Input id="bvn" {...register('bvn', { required: true })} placeholder="Enter your 11-digit BVN" maxLength={11} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nin">National Identification Number (NIN)</Label>
                      <Input id="nin" {...register('nin', { required: true })} placeholder="Enter your 11-digit NIN" maxLength={11} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income (₦)</Label>
                      <Input id="monthlyIncome" type="number" {...register('monthlyIncome', { required: true })} placeholder="Enter monthly income" />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Status</Label>
                      <Select onValueChange={(value) => setValue('employmentStatus', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self Employed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employerName">Employer Name/Business Name</Label>
                      <Input id="employerName" {...register('employerName', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employerAddress">Employer/Business Address</Label>
                      <Input id="employerAddress" {...register('employerAddress', { required: true })} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Bank Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" {...register('bankName', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" {...register('accountNumber', { required: true })} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Next of Kin */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Next of Kin Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinName">Full Name</Label>
                      <Input id="nextOfKinName" {...register('nextOfKinName', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinRelation">Relationship</Label>
                      <Input id="nextOfKinRelation" {...register('nextOfKinRelation', { required: true })} placeholder="e.g., Spouse, Father, Mother, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinPhone">Phone Number</Label>
                      <Input id="nextOfKinPhone" {...register('nextOfKinPhone', { required: true })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="nextOfKinAddress">Address</Label>
                      <Input id="nextOfKinAddress" {...register('nextOfKinAddress', { required: true })} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions of the National Housing Fund program and authorize verification of the information provided above.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <Label htmlFor="privacy" className="text-sm">
                      I consent to the processing of my personal data for the purpose of this housing application in accordance with the Nigeria Data Protection Regulation (NDPR).
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" variant="government" size="lg">
                  Submit Comprehensive Application
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

export default ApplicationFormPage;