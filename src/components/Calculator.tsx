import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator as CalculatorIcon } from 'lucide-react';
import calculatorImage from '@/assets/calculator-illustration.png';

export const Calculator = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--accent))] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  See what property you can afford
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Use our affordability calculator to check what property you can afford with our 
                  innovative financing options including NHF Loans at 6% interest rate and 
                  FMBN Non-Interest Rent-to-Own Scheme.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="government-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[hsl(var(--government-green))] rounded-xl flex items-center justify-center">
                        <CalculatorIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Quick Assessment</h3>
                        <p className="text-muted-foreground">Get instant results based on your income</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="government-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[hsl(var(--government-green-light))] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">6%</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">NHF Loans at 6%</h3>
                        <p className="text-muted-foreground">Competitive interest rates for qualified applicants</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button 
                variant="government" 
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                Check Now
              </Button>
            </div>

            {/* Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(var(--government-green))] rounded-3xl transform rotate-6 opacity-20"></div>
                <img 
                  src={calculatorImage}
                  alt="Affordability Calculator"
                  className="relative z-10 w-full max-w-md h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};