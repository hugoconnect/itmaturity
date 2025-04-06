import React from 'react';
import { formatText } from '../utils/textFormatting';

interface FormattedTextProps {
  children: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ children }) => {
  return <>{formatText(children)}</>;
};