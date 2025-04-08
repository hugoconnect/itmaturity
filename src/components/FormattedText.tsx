import React from 'react';
import { formatText } from '../utils/textFormatting';

interface FormattedTextProps {
  children: string | React.ReactNode;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ children }) => {
  if (typeof children !== 'string') {
    return <>{children}</>;
  }
  return <>{formatText(children)}</>;
};