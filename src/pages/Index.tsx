import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormattedText } from '../components/FormattedText';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            <FormattedText>
              IT maturity assessment for small businesses
            </FormattedText>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <FormattedText>
              discover where your business stands and get actionable steps to improve your IT infrastructure
            </FormattedText>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              <FormattedText>is your IT working for you?</FormattedText>
            </h2>
            <p className="text-gray-600">
              <FormattedText>
                small businesses and law firms face unique IT challenges. limited resources, time constraints, and specialized needs can make managing technology difficult.
              </FormattedText>
            </p>
            <p className="text-gray-600">
              <FormattedText>
                our 5-minute assessment helps you identify strengths and weaknesses in your IT setup across four key areas:
              </FormattedText>
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="bg-brand-light rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">1</div>
                <div>
                  <span className="font-semibold">
                    <FormattedText>people & partnership</FormattedText>
                  </span>
                  <p className="text-gray-600">
                    <FormattedText>who handles your IT and how well that works</FormattedText>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-brand-light rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">2</div>
                <div>
                  <span className="font-semibold">Strategy & Planning</span>
                  <p className="text-gray-600">How IT supports your business goals</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-brand-light rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">3</div>
                <div>
                  <span className="font-semibold">Infrastructure & Systems</span>
                  <p className="text-gray-600">The reliability of your hardware and software</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-brand-light rounded-full w-6 h-6 flex items-center justify-center text-white font-medium mt-0.5">4</div>
                <div>
                  <span className="font-semibold">Security & Compliance</span>
                  <p className="text-gray-600">How well you protect data and meet regulations</p>
                </div>
              </li>
            </ul>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                <FormattedText>what you'll get</FormattedText>
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
                    <FormattedText>
                      your overall IT maturity score and benchmark against industry standards
                    </FormattedText>
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
                    <span className="font-semibold">Detailed breakdown</span> of strengths and weaknesses across four key areas
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
                    <span className="font-semibold">Actionable recommendations</span> tailored to your specific situation
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
                    <span className="font-semibold">Priority focus areas</span> to help you make the most impact with limited resources
                  </p>
                </div>
              </div>
              
              <Button className="w-full text-lg py-6" onClick={() => navigate("/assessment")}>
                <FormattedText>start your free assessment</FormattedText>
              </Button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                <FormattedText>takes approximately 5 minutes to complete</FormattedText>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            <FormattedText>why assess your IT maturity?</FormattedText>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            <FormattedText>
              technology should be an enabler for your business, not a constant source of frustration. understanding where you stand is the first step toward making IT work for you.
            </FormattedText>
          </p>
          
          <Button size="lg" onClick={() => navigate("/assessment")}>
            <FormattedText>take the assessment now</FormattedText>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
