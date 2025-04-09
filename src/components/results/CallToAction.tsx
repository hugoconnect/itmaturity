import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallToActionProps {
  children?: React.ReactNode;  // Change from callToActionContent to children
}

const CallToAction: React.FC<CallToActionProps> = ({ children }) => {
  return (
    <div className="text-center mt-12 p-8 bg-hugo-light rounded-lg">
      <h2 className="heading-secondary mb-4">
        want to discuss your results?
      </h2>
      <p className="text-body mb-6">
        schedule a free consultation to review your IT assessment and get personalized recommendations
      </p>
      {children} {/* Render children instead of callToActionContent */}
    </div>
  );
};

export default CallToAction;
