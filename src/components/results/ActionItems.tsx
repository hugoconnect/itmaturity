import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentResult, CategoryId } from "@/types/assessment";
import { getCategoryName, getActionItems } from "@/utils/assessmentUtils";
import { CheckCircle } from "lucide-react";

interface ActionItemsProps {
  result: AssessmentResult;
}

const ActionItems = ({ result }: ActionItemsProps) => {
  const { focusArea } = result;
  const actionItems = getActionItems(focusArea as CategoryId);

  return (
    <Card className="mb-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-hugo-light to-hugo-light/30 border-b border-hugo-light p-6">
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="text-hugo-primary font-semibold">
            your IT health check focus area:
          </span>
          {getCategoryName(focusArea as CategoryId)}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-6 text-hugo-accent">
          based on your answers, we've identified your primary focus area for improvement. 
          here are some practical next steps you can take:
        </p>
        
        <div className="space-y-4">
          {actionItems.map((item, index) => (
            <div 
              key={index} 
              className="flex gap-4 items-start bg-white hover:bg-slate-50 rounded-lg p-4 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <div className="text-primary flex-shrink-0 mt-0.5">
                <CheckCircle className="h-6 w-6" />
              </div>
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionItems;
