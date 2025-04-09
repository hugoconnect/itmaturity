import { useEffect, useState } from "react";
import { 
  Radio, 
  RadioGroup,
  Label,
  useId
} from "@fluentui/react-components";
import { Question } from "@/types/assessment";

interface QuestionItemProps {
  question: Question;
  value: number | null;
  onChange: (value: number | null) => void;
}

const QuestionItem = ({ question, value, onChange }: QuestionItemProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(value === null ? "na" : value.toString());
  const radioGroupId = useId("question-radio");
  
  // Update local state when parent value changes
  useEffect(() => {
    setSelectedValue(value === null ? "na" : value.toString());
  }, [value]);

  const handleChange = (_ev: any, data: { value: string }) => {
    const val = data.value;
    const numValue = val === "na" ? null : parseInt(val, 10);
    setSelectedValue(val);
    onChange(numValue);
  };

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-medium text-hugo-dark">{question.text}</h3>
      <RadioGroup
        value={selectedValue}
        onChange={handleChange}
        layout="horizontal"
        className="grid grid-cols-1 md:grid-cols-6 gap-2"
      >
        <div className="md:col-span-5 grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <div key={rating} className="flex flex-col items-center">
              <div className={`
                w-full cursor-pointer relative p-3 rounded-md border 
                ${selectedValue === rating.toString() 
                  ? 'border-hugo-primary bg-hugo-light' 
                  : 'border-gray-200'} 
                transition-all duration-200 hover:border-hugo-primary hover:bg-hugo-light/50
              `}>
                <Radio
                  value={rating.toString()}
                  id={`${question.id}-${rating}`}
                  label={{
                    children: (
                      <div className="flex flex-col items-center justify-center w-full text-center">
                        <span className="text-2xl font-bold text-hugo-primary">{rating}</span>
                        <span className="mt-1 text-xs md:text-sm text-hugo-accent">
                          {rating === 1
                            ? "Strongly Disagree"
                            : rating === 5
                            ? "Strongly Agree"
                            : ""}
                        </span>
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {question.allowNA && (
          <div className="col-span-1">
            <div className={`
              w-full cursor-pointer relative p-3 rounded-md border 
              ${selectedValue === "na" 
                ? 'border-hugo-primary bg-hugo-light' 
                : 'border-gray-200'} 
              transition-all duration-200 hover:border-hugo-primary hover:bg-hugo-light/50
            `}>
              <Radio
                value="na"
                id={`${question.id}-na`}
                label={{
                  children: (
                    <div className="flex flex-col items-center justify-center w-full text-center">
                      <span className="text-sm font-medium text-hugo-primary">
                        N/A
                      </span>
                    </div>
                  )
                }}
              />
            </div>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export default QuestionItem;
