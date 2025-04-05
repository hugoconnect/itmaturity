
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentResult } from "@/types/assessment";
import { getCategoryName } from "@/utils/assessmentUtils";

interface ResultsChartProps {
  result: AssessmentResult;
}

const ResultsChart = ({ result }: ResultsChartProps) => {
  const { categoryScores } = result;
  
  const chartData = categoryScores.map((category) => ({
    name: getCategoryName(category.category),
    value: category.percentage,
    score: category.score,
    maxScore: category.maxScore,
  }));

  const COLORS = ["#0078D4", "#50E6FF", "#2B88D8", "#0063B1"]; // Fluent 2 blue palette

  return (
    <Card className="rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/30 border-b border-gray-100 p-6 pb-4">
        <CardTitle className="text-xl text-gray-800">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name}: ${Math.round(value)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [
                  `${Math.round(value as number)}%`, 
                  name
                ]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)', 
                  border: '1px solid #f0f0f0' 
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 space-y-5">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Scores</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {categoryScores.map((category) => (
              <div 
                key={category.category} 
                className="bg-white hover:bg-slate-50 rounded-lg p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200 shadow-sm"
              >
                <div className="font-medium text-gray-800">{getCategoryName(category.category)}</div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">
                    {category.score}/{category.maxScore} points
                  </span>
                  <span className="font-semibold text-primary">
                    {Math.round(category.percentage)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
