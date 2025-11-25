import federalMortgageBankLogo from '@/assets/partners/fmbn.png';
import newFrontierDevelopmentBankLogo from '@/assets/partners/new-frontier.png';
import federalMinistryOfEducationLogo from '@/assets/partners/ministry-logo.png';

export const PartnersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--accent))]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 flex justify-center items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Partners
            </h2>
          </div>
          <div className="mx-auto max-w-4xl flex justify-center px-6 lg:px-8">
            <div
              className="mx-auto grid max-w-5xl grid-cols-6 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-6">
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src={federalMortgageBankLogo}
                alt="Federal Mortgage Bank Logo"
              />
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src={newFrontierDevelopmentBankLogo}
                alt="New Frontier Development Logo"
              />
              <img
                className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                src={federalMinistryOfEducationLogo}
                alt="Federal Ministry of Education Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
