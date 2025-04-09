import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserInfo, AssessmentResult } from "@/types/assessment";
import { getMaturityLevelDescription } from "@/utils/assessmentUtils";
import ResultsChart from "./ResultsChart";

interface ResultsOverviewProps {
  result: AssessmentResult;
  userInfo: UserInfo;
}

const ResultsOverview = ({ result, userInfo }: ResultsOverviewProps) => {
  const { overallScore, maturityLevel } = result;
  const maturityDescription = getMaturityLevelDescription(maturityLevel);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="heading-primary">
          your IT health check results
        </h2>
        <p className="text-xl text-hugo-accent">
          for {userInfo.company}
        </p>
      </div>

      <Card className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-hugo-light to-white border-b border-gray-100 p-6 pb-4">
          <CardTitle className="text-xl text-hugo-dark">overall score</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-hugo-accent/60">0%</span>
            <span className="text-3xl font-bold text-hugo-accent">{Math.round(overallScore)}%</span>
            <span className="text-sm text-hugo-accent/60">100%</span>
          </div>
          <div className="relative w-full h-2.5 bg-gray-50 rounded-full">
            <div
              className="absolute top-0 left-0 h-2.5 bg-gradient-to-r from-hugo-primary/80 to-hugo-anchor/80 rounded-full transition-all duration-300"
              style={{ width: `${overallScore}%` }}
            />
          </div>
          
          <div className="mt-8 space-y-3 text-center">
            <div className="text-2xl font-semibold text-hugo-accent">
              {maturityLevel}
            </div>
            <p className="text-hugo-dark/80 max-w-lg mx-auto">
              {maturityDescription}
            </p>
          </div>
        </CardContent>
      </Card>

      <ResultsChart result={result} />
    </div>
  );
};

export default ResultsOverview;
