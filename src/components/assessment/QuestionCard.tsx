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
      <div className="mb-4">
        <FormattedText>{question.text}</FormattedText>
      </div>
      {/* ...existing answer options code... */}
    </div>
  );
};

export default QuestionCard;