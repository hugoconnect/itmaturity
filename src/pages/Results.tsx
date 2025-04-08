import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentResult, UserInfo } from "@/types/assessment";
import ResultsOverview from "@/components/results/ResultsOverview";
import ActionItems from "@/components/results/ActionItems";
import CallToAction from "@/components/results/CallToAction";
import { Button } from "@/components/ui/button";
import { FormattedText } from '../components/FormattedText';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get results from session storage
    const storedResults = sessionStorage.getItem("assessmentResults");
    const storedUserInfo = sessionStorage.getItem("userInfo");
    
    if (storedResults && storedUserInfo) {
      setResults(JSON.parse(storedResults));
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // No results found, redirect back to assessment
      navigate("/assessment");
    }
    
    setLoading(false);
  }, [navigate]);

  const handleStartNew = () => {
    // Clear session storage
    sessionStorage.removeItem("assessmentResults");
    sessionStorage.removeItem("userInfo");
    
    // Navigate to assessment page
    navigate("/assessment");
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
    <div className="container py-8 max-w-4xl">
      <ResultsOverview result={results} userInfo={userInfo} />
      
      <div className="my-8">
        <ActionItems result={results} />
        <CallToAction />
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" onClick={handleStartNew}>
          start a new assessment
        </Button>
      </div>
    </div>
  );
};

export default Results;
