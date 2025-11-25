import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Calculator } from '@/components/Calculator';
import { Footer } from '@/components/Footer';
import {PartnersSection} from "@/components/PartnersSection.tsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PartnersSection />
        <Calculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
