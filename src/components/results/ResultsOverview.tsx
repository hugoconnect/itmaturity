import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserInfo, AssessmentResult } from "@/types/assessment";
import { getMaturityLevelName, getMaturityLevelDescription } from "@/utils/assessmentUtils";
import ResultsChart from "./ResultsChart";

interface ResultsOverviewProps {
  result: AssessmentResult;
  userInfo: UserInfo;
}

const ResultsOverview = ({ result, userInfo }: ResultsOverviewProps) => {
  const { maturityLevel, overallScore, categoryScores } = result;
  
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900">
          your IT health check results
        </h2>
        <p className="text-xl text-gray-600">
          for {userInfo.company}
        </p>
      </div>

      <Card className="rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/30 border-b border-gray-100 p-6 pb-4">
          <CardTitle className="text-xl text-gray-800">overall score</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">0%</span>
            <span className="text-3xl font-bold text-primary">{Math.round(overallScore)}%</span>
            <span className="text-sm text-gray-500">100%</span>
          </div>
          <Progress value={Math.round(overallScore)} className="h-3 rounded-full bg-gray-100" />
          
          <div className="mt-8 space-y-3 text-center">
            <div className="text-2xl font-semibold">
              {getMaturityLevelName(maturityLevel)}
            </div>
            <p className="text-gray-600 max-w-lg mx-auto">
              {getMaturityLevelDescription(maturityLevel)}
            </p>
          </div>
        </CardContent>
      </Card>

      {categoryScores && <ResultsChart result={result} />}
    </div>
  );
};

export default ResultsOverview;
