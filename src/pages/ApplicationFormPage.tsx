import { useState } from 'react';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {CheckCircle, Info} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {useAuth} from "@/hooks/useAuth.js.ts";

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi',
  'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

interface FormData {
  // Location preferences
  property_state: string;
  property_type: string;
  
  // Payment
  payment_mode: string;
  
  // Personal Info
  firstname: string;
  lastname: string;
  email: string;
  date_of_birth: string;
  phone: string;
  state_of_origin: string;
  
  // Financial Info
  bvn: string;
  nin: string;
  monthly_income: string;
  employment_status: string;
  employer_name: string;
  employer_address: string;
  
  // Bank Details
  bank_name: string;
  account_number: string;
  
  // Next of Kin
  next_of_kin: string;
  relationship_with_next_of_kin: string;
  next_of_kin_phone: string;
  next_of_kin_address: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    applicationId: string;
    referenceNumber: string;
    status: string;
  };
  message: string;
  errors?: Record<string, string[]>;
}

interface Toast {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

const Header = () => (
  <header className="bg-white border-b shadow-sm">
    <a href="/" className="container mx-auto px-4 py-4 inline-block">
      <h1 className="text-2xl font-bold text-green-600">Nigerian Housing Fund</h1>
      <span className="text-sm text-gray-600">Teacher Housing Application Portal</span>
    </a>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-50 border-t">
    <div className="container mx-auto px-4 py-6">
      <p className="text-center text-sm text-gray-600">
        © 2025 Nigerian Housing Fund. All rights reserved.
      </p>
    </div>
  </footer>
);

// Toast Component
const Toast = ({ toast, onClose }: { toast: Toast; onClose: () => void }) => (
  <div className={`fixed top-4 right-4 z-50 min-w-80 p-4 rounded-lg shadow-lg ${
    toast.variant === 'destructive' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
  }`}>
    <div className="flex items-start justify-between">
      <div>
        <h4 className={`font-semibold ${toast.variant === 'destructive' ? 'text-red-800' : 'text-green-800'}`}>
          {toast.title}
        </h4>
        <p className={`text-sm mt-1 ${toast.variant === 'destructive' ? 'text-red-600' : 'text-green-600'}`}>
          {toast.description}
        </p>
      </div>
      <button
        onClick={onClose}
        className={`ml-4 ${toast.variant === 'destructive' ? 'text-red-400 hover:text-red-600' : 'text-green-400 hover:text-green-600'}`}
      >
        ×
      </button>
    </div>
  </div>
);

const ApplicationFormPage = () => {
  const { updateProfile, authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    property_state: '',
    property_type: '',
    payment_mode: '',
    firstname: '',
    lastname: '',
    email: '',
    date_of_birth: '',
    phone: '',
    state_of_origin: '',
    bvn: '',
    nin: '',
    monthly_income: '',
    employment_status: '',
    employer_name: '',
    employer_address: '',
    bank_name: '',
    account_number: '',
    next_of_kin: '',
    relationship_with_next_of_kin: '',
    next_of_kin_phone: '',
    next_of_kin_address: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.firstname.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.date_of_birth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    // if (!formData.property_state) newErrors.state = 'State is required';
    if (!formData.state_of_origin) newErrors.stateOfOrigin = 'State of origin is required';
    if (!formData.property_state) newErrors.propertyType = 'Property type is required';
    if (!formData.payment_mode) newErrors.paymentMode = 'Payment mode is required';
    if (!formData.bvn.trim()) newErrors.bvn = 'BVN is required';
    if (!formData.nin.trim()) newErrors.nin = 'NIN is required';
    if (!formData.monthly_income.trim()) newErrors.monthlyIncome = 'Monthly income is required';
    if (!formData.employment_status) newErrors.employmentStatus = 'Employment status is required';
    if (!formData.employer_name.trim()) newErrors.employerName = 'Employer name is required';
    if (!formData.employer_address.trim()) newErrors.employerAddress = 'Employer address is required';
    if (!formData.bank_name.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.account_number.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.next_of_kin.trim()) newErrors.nextOfKinName = 'Next of kin name is required';
    if (!formData.relationship_with_next_of_kin.trim()) newErrors.nextOfKinRelation = 'Relationship is required';
    if (!formData.next_of_kin_phone.trim()) newErrors.nextOfKinPhone = 'Next of kin phone is required';
    if (!formData.next_of_kin_address.trim()) newErrors.nextOfKinAddress = 'Next of kin address is required';

    // Format validation
    if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.phone && !/^(\+234|234|0)?[789][01]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Nigerian phone number';
    }
    if (formData.bvn && !/^\d{11}$/.test(formData.bvn)) {
      newErrors.bvn = 'BVN must be exactly 11 digits';
    }
    if (formData.nin && !/^\d{11}$/.test(formData.nin)) {
      newErrors.nin = 'NIN must be exactly 11 digits';
    }
    if (formData.account_number && !/^\d{10}$/.test(formData.account_number)) {
      newErrors.account_number = 'Account number must be exactly 10 digits';
    }
    if (formData.monthly_income && parseInt(formData.monthly_income) < 30000) {
      newErrors.monthlyIncome = 'Minimum monthly income is ₦30,000';
    }

    // Consent validation
    if (!termsAccepted) newErrors.terms = 'You must accept the terms and conditions';
    if (!privacyConsent) newErrors.privacy = 'You must consent to data processing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      property_state: '',
      property_type: '',
      payment_mode: '',
      firstname: '',
      lastname: '',
      email: '',
      date_of_birth: '',
      phone: '',
      state_of_origin: '',
      bvn: '',
      nin: '',
      monthly_income: '',
      employment_status: '',
      employer_name: '',
      employer_address: '',
      bank_name: '',
      account_number: '',
      next_of_kin: '',
      relationship_with_next_of_kin: '',
      next_of_kin_phone: '',
      next_of_kin_address: ''
    });
    setErrors({});
    setTermsAccepted(false);
    setPrivacyConsent(false);
    setSubmitStatus('idle');
    setApiResponse(null);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await updateProfile(data);
      setIsSubmitted(true);

      setIsLoading(false);

      toast({
        title: "Application Submitted Successfully!",
        description: "Your application has been received. Our team will review and contact you within 5-7 business days.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during submission. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Success state
  if (submitStatus === 'success' || authState.user?.bvn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-green-600">Application Submitted!</CardTitle>
                <CardDescription>Your application has been received</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Thank you for completing your application. Our team will review your information and contact you within 5-7 business days with next steps.
                </p>
                <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg">
                  <p><strong>Name:</strong> {authState.user?.firstname} {authState.user?.lastname}</p>
                  <p><strong>Email:</strong> {authState.user?.email}</p>
                  <p><strong>Property Type:</strong> {authState.user?.property_type}</p>
                  <p><strong>Mode of Payment:</strong> {authState.user?.payment_mode}</p>
                  <p><strong>Status:</strong>Under Review</p>
                  <p><strong>Submitted:</strong> {new Date(authState?.user?.updated_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={() => window.print()}
                    variant="default"
                    className="flex-1"
                  >
                    Print Confirmation
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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Housing Application</CardTitle>
              <CardDescription>
                Complete this detailed form to proceed with your application for the Affordable Housing Scheme for all Staff and Teachers of the Ministry Of Education
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
                      <Select onValueChange={(value) => setValue('property_state', value)}>
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
                      <Select onValueChange={(value) => setValue('property_type', value)}>
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
                  <RadioGroup onValueChange={(value) => setValue('payment_mode', value)}>
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
                      <Input id="firstName" {...register('firstname', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" {...register('lastname', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input id="dateOfBirth" type="date" {...register('date_of_birth', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" {...register('phone', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label>State of Origin</Label>
                      <Select onValueChange={(value) => setValue('state_of_origin', value)}>
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
                      <Input id="monthlyIncome" type="number" {...register('monthly_income', { required: true })} placeholder="Enter monthly income" />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Status</Label>
                      <Select onValueChange={(value) => setValue('employment_status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teacher-public">Public School Teacher</SelectItem>
                          <SelectItem value="teacher-private">Private School Teacher</SelectItem>
                          <SelectItem value="teacher-university">University Lecturer</SelectItem>
                          <SelectItem value="teacher-retired">Retired Teacher</SelectItem>
                          <SelectItem value="education-admin">Education Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employerName">Employer Name/Business Name</Label>
                      <Input id="employerName" {...register('employer_name', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employerAddress">Employer/Business Address</Label>
                      <Input id="employerAddress" {...register('employer_address', { required: true })} />
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
                      <Input id="bankName" {...register('bank_name', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" {...register('account_number', { required: true })} />
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
                      <Input id="nextOfKinName" {...register('next_of_kin', { required: true })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinRelation">Relationship</Label>
                      <Input id="nextOfKinRelation" {...register('relationship_with_next_of_kin', { required: true })} placeholder="e.g., Spouse, Father, Mother, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinPhone">Phone Number</Label>
                      <Input id="nextOfKinPhone" {...register('next_of_kin_phone', { required: true })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="nextOfKinAddress">Address</Label>
                      <Input id="nextOfKinAddress" {...register('next_of_kin_address', { required: true })} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions of the Affordable Housing Scheme for all Staff and Teachers of the Ministry Of Education and authorize verification of the information provided above.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <Label htmlFor="privacy" className="text-sm">
                      I consent to the processing of my personal data for the purpose of this housing application in accordance with the Nigeria Data Protection Regulation (NDPR).
                    </Label>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full" variant="government" size="lg">
                  {isLoading ? 'Submitting...' : 'Submit Application'}
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
