import React from 'react';
import { formatText } from '../utils/textFormatting';

interface FormattedTextProps {
  children: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ children }) => {
  if (typeof children !== 'string') {
    console.warn('FormattedText received non-string children');
    return <>{children}</>;
  }
  
  return <>{formatText(children)}</>;
};