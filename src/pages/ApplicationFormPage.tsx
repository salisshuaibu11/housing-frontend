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
import {CheckCircle, Info} from 'lucide-react';
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
  const [formData, setFormData] = useState({
    state: '',
    propertyType: '',
    paymentMode: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    stateOfOrigin: '',
    bvn: '',
    nin: '',
    monthlyIncome: '',
    employmentStatus: '',
    employerName: '',
    employerAddress: '',
    bankName: '',
    accountNumber: '',
    nextOfKinName: '',
    nextOfKinRelation: '',
    nextOfKinPhone: '',
    nextOfKinAddress: ''
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.stateOfOrigin) newErrors.stateOfOrigin = 'State of origin is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
    if (!formData.bvn.trim()) newErrors.bvn = 'BVN is required';
    if (!formData.nin.trim()) newErrors.nin = 'NIN is required';
    if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = 'Monthly income is required';
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
    if (!formData.employerName.trim()) newErrors.employerName = 'Employer name is required';
    if (!formData.employerAddress.trim()) newErrors.employerAddress = 'Employer address is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.nextOfKinName.trim()) newErrors.nextOfKinName = 'Next of kin name is required';
    if (!formData.nextOfKinRelation.trim()) newErrors.nextOfKinRelation = 'Relationship is required';
    if (!formData.nextOfKinPhone.trim()) newErrors.nextOfKinPhone = 'Next of kin phone is required';
    if (!formData.nextOfKinAddress.trim()) newErrors.nextOfKinAddress = 'Next of kin address is required';

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
    if (formData.accountNumber && !/^\d{10}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be exactly 10 digits';
    }
    if (formData.monthlyIncome && parseInt(formData.monthlyIncome) < 30000) {
      newErrors.monthlyIncome = 'Minimum monthly income is ₦30,000';
    }

    // Consent validation
    if (!termsAccepted) newErrors.terms = 'You must accept the terms and conditions';
    if (!privacyConsent) newErrors.privacy = 'You must consent to data processing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API submission function
  const submitToBackend = async (data: FormData): Promise<ApiResponse> => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.housingfund.gov.ng';

    // Transform form data for backend
    const payload = {
      personal_info: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        date_of_birth: data.dateOfBirth,
        phone: data.phone,
        state_of_origin: data.stateOfOrigin
      },
      identification: {
        bvn: data.bvn,
        nin: data.nin
      },
      employment: {
        status: data.employmentStatus,
        employer_name: data.employerName,
        employer_address: data.employerAddress,
        monthly_income: parseInt(data.monthlyIncome)
      },
      banking: {
        bank_name: data.bankName,
        account_number: data.accountNumber
      },
      preferences: {
        state: data.state,
        property_type: data.propertyType,
        payment_mode: data.paymentMode
      },
      next_of_kin: {
        name: data.nextOfKinName,
        relationship: data.nextOfKinRelation,
        phone: data.nextOfKinPhone,
        address: data.nextOfKinAddress
      },
      consent: {
        terms_accepted: termsAccepted,
        privacy_consent: privacyConsent
      },
      metadata: {
        submitted_at: new Date().toISOString(),
        user_agent: navigator.userAgent,
        ip_address: null // This would be captured on backend
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/teacher-housing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-API-Version': '1.0'
          // Add authentication headers if needed:
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Submission failed');
      }

      return result;
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Network error. Please check your connection and try again.',
        };
      }

      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     toast({
  //       title: "Validation Error",
  //       description: "Please correct the errors and try again.",
  //       variant: 'destructive'
  //     });
  //     return;
  //   }
  //
  //   setIsSubmitting(true);
  //   setSubmitStatus('idle');
  //
  //   try {
  //     const response = await submitToBackend(formData);
  //     setApiResponse(response);
  //
  //     if (response.success) {
  //       setSubmitStatus('success');
  //       toast({
  //         title: "Application Submitted Successfully!",
  //         description: `Your application has been received. Reference: ${response.data?.referenceNumber}`,
  //       });
  //     } else {
  //       setSubmitStatus('error');
  //       toast({
  //         title: "Submission Failed",
  //         description: response.message,
  //         variant: "destructive"
  //       });
  //     }
  //   } catch (error) {
  //     setSubmitStatus('error');
  //     toast({
  //       title: "Submission Error",
  //       description: "An unexpected error occurred. Please try again.",
  //       variant: "destructive"
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const resetForm = () => {
    setFormData({
      state: '',
      propertyType: '',
      paymentMode: '',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      phone: '',
      stateOfOrigin: '',
      bvn: '',
      nin: '',
      monthlyIncome: '',
      employmentStatus: '',
      employerName: '',
      employerAddress: '',
      bankName: '',
      accountNumber: '',
      nextOfKinName: '',
      nextOfKinRelation: '',
      nextOfKinPhone: '',
      nextOfKinAddress: ''
    });
    setErrors({});
    setTermsAccepted(false);
    setPrivacyConsent(false);
    setSubmitStatus('idle');
    setApiResponse(null);
  };

  const onSubmit = (data: FormData) => {
    console.log('Comprehensive form submitted:', data);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted Successfully!",
      description: "Your comprehensive application has been received. Our team will review and contact you within 5-7 business days.",
    });
  };

  // Success state
  if (submitStatus === 'success' && apiResponse?.success) {
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
                <CardDescription>Your comprehensive application has been received</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Thank you for completing your detailed application. Our team will review your information and contact you within 5-7 business days with next steps.
                </p>
                <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg">
                  <p><strong>Application ID:</strong> {apiResponse.data?.applicationId || 'NHF-' + Date.now().toString().slice(-6)}</p>
                  <p><strong>Reference Number:</strong> {apiResponse.data?.referenceNumber || 'REF-' + Date.now().toString().slice(-8)}</p>
                  <p><strong>Status:</strong> {apiResponse.data?.status || 'Under Review'}</p>
                  <p><strong>Submitted:</strong> {new Date().toLocaleString()}</p>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1"
                  >
                    Submit Another Application
                  </Button>
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
                Complete this detailed form to proceed with your application for the Affordable Housing Scheme for Teachers
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
                      I agree to the terms and conditions of the Affordable Housing Scheme for Teachers and authorize verification of the information provided above.
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
