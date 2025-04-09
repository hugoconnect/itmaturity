import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoColor from "@/assets/logo-color.png";
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <img 
          src={logoColor} 
          alt="Company Logo" 
          className="h-12 md:h-16 w-auto"
        />
      </div>

      <div className="content-wrapper">
        <div className="text-center mb-12">
          <h1 className="heading-primary mb-4">
            IT health check for small businesses
          </h1>
          <p className="text-xl text-hugo-dark max-w-3xl mx-auto">
            discover where your business stands and get actionable steps to improve your IT infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="heading-secondary">
              is your IT working for you?
            </h2>
            <p className="text-body">
              small businesses and law firms face unique IT challenges. limited resources, time constraints, and specialized needs can make managing technology difficult.
            </p>
            <p className="text-body">
              our 5-minute assessment helps you identify strengths and weaknesses in your IT setup across four key areas:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="bg-hugo-primary rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">1</div>
                <div>
                  <span className="font-semibold">
                    IT responsibility & support
                  </span>
                  <p className="text-body">
                    who handles your IT and how well that works
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-hugo-primary rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">2</div>
                <div>
                  <span className="font-semibold">
                    business & technology alignment
                  </span>
                  <p className="text-body">
                    how technology supports your business goals
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-hugo-primary rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">3</div>
                <div>
                  <span className="font-semibold">
                    core technology & reliability
                  </span>
                  <p className="text-body">
                    the reliability of your hardware and software
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-hugo-primary rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">4</div>
                <div>
                  <span className="font-semibold">
                    security & data protection
                  </span>
                  <p className="text-body">
                    how well you protect data and meet regulations
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <Card className="fluent-card">
            <CardContent className="p-8">
              <h2 className="heading-secondary mb-4">
                what you'll get
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <div className="text-brand shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p>
                    <span className="font-semibold">your overall IT health score and benchmark against industry standards</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-brand shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p>
                    <span className="font-semibold">detailed breakdown 
                    of strengths and weaknesses across four key areas</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-brand shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p>
                    <span className="font-semibold">actionable recommendations 
                    tailored to your specific situation</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-brand shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p>
                    <span className="font-semibold">priority focus areas
                    to help you make the most impact with limited resources</span>
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full text-lg py-6 bg-hugo-anchor hover:bg-hugo-anchor/90" 
                onClick={() => navigate("/assessment")}
              >
                start your free assessment
              </Button>
              
              <p className="text-sm text-hugo-dark/70 text-center mt-4">
                takes approximately 5 minutes to complete
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="heading-secondary mb-4">
            why check your IT health?
          </h2>
          <p className="text-body max-w-3xl mx-auto mb-8">
            technology should be an enabler for your business, not a constant source of frustration. understanding where you stand is the first step toward making IT work for you.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate("/assessment")}
            variant="secondary" // Change to use hugo-anchor color
          >
            take the assessment now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
