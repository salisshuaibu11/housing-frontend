import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calculator } from '@/components/Calculator';

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Housing Affordability Calculator</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Calculate what you can afford with our National Housing Fund mortgage program at just 6% interest rate. 
            Discover your monthly payments and total loan amount based on your income.
          </p>
        </div>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;