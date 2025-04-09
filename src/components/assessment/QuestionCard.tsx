import React from 'react';
import { FormattedText } from '../FormattedText';
import { Question } from '@/types/assessment';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface QuestionCardProps {
  question: Question;
  selectedValue?: string;
  onAnswer: (value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedValue, onAnswer }) => {
  return (
    <div className="mb-6">
      <div className="mb-4 text-hugo-dark font-medium">
        <FormattedText>{question.text}</FormattedText>
      </div>
      <RadioGroup
        value={selectedValue}
        onValueChange={onAnswer}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <div 
            key={option.value} 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-hugo-light/50 transition-colors"
          >
            <RadioGroupItem 
              value={option.value} 
              id={option.value}
              className="text-hugo-primary border-hugo-accent/30 data-"
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionCard;