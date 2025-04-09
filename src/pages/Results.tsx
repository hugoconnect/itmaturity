import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentResult, UserInfo } from "@/types/assessment";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ResultsOverview from "@/components/results/ResultsOverview";
import ActionItems from "@/components/results/ActionItems";
import logoColor from '@/assets/logo-color.png';
import Footer from '@/components/Footer';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("assessmentResults");
    const storedUserInfo = sessionStorage.getItem("userInfo");
    
    if (storedResults && storedUserInfo) {
      setResults(JSON.parse(storedResults));
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate("/assessment");
    }
    
    setLoading(false);
  }, [navigate]);

  const handleStartNew = () => {
    // Clear all session storage
    sessionStorage.removeItem("assessmentResults");
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("currentStep");
    sessionStorage.removeItem("completedSteps");
    sessionStorage.removeItem("answers");
    
    // Navigate to assessment page with replace to prevent going back
    navigate("/assessment", { replace: true });
  };

  const handleDownloadPDF = async () => {
    if (!results || !userInfo) return;
    
    try {
      console.log('Sending request to download PDF...'); 
      // Use the GitHub Codespace URL but with port 3001 for the API
      const response = await fetch('https://organic-garbanzo-976rwr66g44j2xrqq-3001.app.github.dev/api/assessment/download-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results, userInfo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `it-health-check-${userInfo.company}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert(`Failed to download PDF: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <p>loading your results...</p>
      </div>
    );
  }

  if (!results || !userInfo) {
    return (
      <div className="container py-16 text-center">
        <p className="mb-4">no assessment results found.</p>
        <Button onClick={() => navigate("/assessment")}>
          take the assessment
        </Button>
      </div>
    );
  }

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
        <div className="assessment-container">
          <ResultsOverview result={results} userInfo={userInfo} />

          {/* Action Items Section */}
          <div className="my-8">
            <ActionItems result={results} />
          </div>

          {/* Call to Action Section */}
          <div className="bg-hugo-light rounded-lg p-8 text-center">
            <h2 className="heading-secondary mb-4">
              ready to improve your IT health?
            </h2>
            <p className="text-body mb-6">
              schedule a free consultation to discuss your results and create an action plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={handleDownloadPDF}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                download results pdf
              </Button>
              <Button 
                size="lg"
                variant="secondary"
              >
                schedule a consultation
              </Button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={handleStartNew}>
              start a new assessment
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Results;